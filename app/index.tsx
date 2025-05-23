
import { StyleSheet, View, Alert, Pressable, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HomeScreen() {
  
  const [toggledButtons, setToggledButtons] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);

  const exampleLines = [
    'Line 1: Welcome to Gabi!',
    'Line 2: This is an example screen.',
    'Line 3: Using custom font OpenDyslexic.',
    'Line 4: Buttons are on the right, for speak, listen, and menu.',
    'Line 5: Press buttons far right to simulate scroll wheel'
  ];

 const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isWordMode, setIsWordMode] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [highlightWordIndex, setHighlightWordIndex] = useState(0);

  const animateAllLinesByWords = async () => {
  setIsAnimating(true);
  const animatedLines: string[] = [];

  for (let i = 0; i < exampleLines.length; i++) {
    const words = exampleLines[i].split(' ');
    let currentLine = '';

    for (let j = 0; j < words.length; j++) {
      currentLine += (j > 0 ? ' ' : '') + words[j];

      const updated = [...animatedLines, currentLine];
      setDisplayedLines([
        ...updated,
        ...Array(exampleLines.length - updated.length).fill(''),
      ]);

      // 👇 Update the highlight index to match the currently animating line
      setHighlightIndex(i);

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    animatedLines.push(exampleLines[i]);
  }

  setIsAnimating(false);
};

  const toggleButton = (index: number) => {
  setToggledButtons(prev => {
    const newState = [...prev] as [boolean, boolean, boolean];
    newState[index] = !newState[index];
    return newState;
  });
};

const animateWords = async (words: string[]) => {
  for (let i = 0; i < words.length; i++) {
    setHighlightWordIndex(i);
    await new Promise(resolve => setTimeout(resolve, 400));
  }
};

 

    const scrollUp = () => {
      if (isWordMode) {
        setHighlightWordIndex(prev => Math.max(prev - 1, 0));
      } else {
        setHighlightIndex(prev => (prev - 1 + exampleLines.length) % exampleLines.length);
        setHighlightWordIndex(0); // Reset word index on new line
      }
    };

    const scrollDown = () => {
      if (isWordMode) {
        const words = exampleLines[highlightIndex].split(' ');
        setHighlightWordIndex(prev => Math.min(prev + 1, words.length - 1));
      } else {
        setHighlightIndex(prev => (prev + 1) % exampleLines.length);
        setHighlightWordIndex(0); // Reset word index on new line
      }
    };
    const [highlightIndex, setHighlightIndex] = useState(0);

    const autoScrollLines = async () => {
  for (let i = highlightIndex; i < exampleLines.length; i++) {
    setHighlightIndex(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};


  return (
    <View style={styles.container}>
      <ThemedView style={styles.leftBoxOuter}>
            <ThemedView style={styles.leftBoxInner}>
              <ScrollView style={styles.scrollArea}>
                {displayedLines.map((line, index) => {
                  if (isWordMode && index === highlightIndex) {
                    const words = line.split(' ');
                    return (
                      <Text key={index} style={styles.lineText}>
                        {words.map((word, wIndex) => (
                          <Text
                            key={wIndex}
                            style={wIndex === highlightWordIndex ? styles.highlightedLine : undefined}
                          >
                            {word + ' '}
                          </Text>
                        ))}
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        key={index}
                        style={[
                          styles.lineText,
                          index === highlightIndex && !isWordMode && styles.highlightedLine,
                        ]}
                      >
                        {line}
                      </Text>
                    );
                  }
                })}
              </ScrollView>
            </ThemedView>
          </ThemedView>

    
      {/* Right side with buttons */}
      <ThemedView style={styles.rightBox}>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.bevelButton, toggledButtons[0] && styles.glow]}
            onPress={() => {
              toggleButton(0);
              autoScrollLines()
            }}
          >
            <AntDesign name="sound" size={24} color="#fff" style={styles.iconOnly} />
          </Pressable>
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.bevelButton, toggledButtons[1] && styles.glow]}
            onPress={() => {
              toggleButton(1);
              if (isWordMode) {
                animateWords(highlightedWords)
              } else {
                animateAllLinesByWords();
              }
              
            }}
          >
            <Ionicons name="mic-sharp" size={24} color="#fff" style={styles.iconOnly} />
          </Pressable>
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.bevelButton, toggledButtons[2] && styles.glow]}
            onPress={() => {
              toggleButton(2);
              
              // Clear the screen
              setDisplayedLines([]);

              // Reset indices
              setHighlightIndex(0);
              setHighlightWordIndex(0);

              setHighlightedWords([])

              // Optionally reset word-by-word mode
              setIsWordMode(false);
              setIsAnimating(false)
            }}
          >
            <Ionicons name="menu" size={24} color="#fff" style={styles.iconOnly} />
          </Pressable>
        </View>
      </ThemedView>


      {/* Scroll bar */}
      <View style={styles.scrollBar}>
        <TouchableOpacity onPress={scrollUp} style={styles.scrollButton}>
          <Ionicons name="chevron-up" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scrollButton}
          onPress={() => {
            setIsWordMode(!isWordMode);
            const words = exampleLines[highlightIndex].split(' ');
            setHighlightedWords(words);
            setHighlightWordIndex(0);
          }}
        >
          <Ionicons name="stop-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollDown} style={styles.scrollButton}>
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftBoxOuter: {
    flex: 6,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  leftBoxInner: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: '#bdbdbd',
    borderRadius: 12,
  },
  scrollArea: {
    flex: 1,
  },
  lineText: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
     fontFamily: 'OpenDyslexicBold',
  },
  highlightedLine: {
    backgroundColor: '#efefef',
  },
  scrollBar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#607D8B',
  },
  scrollButton: {
    padding: 10,
    marginVertical: 4,
    backgroundColor: '#455A64',
    borderRadius: 8,
  },
  rightBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333',
  },
  buttonWrapper: {
    marginVertical: 8,
    width: 60,
    height: 60,
  },
  bevelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#546E7A',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#263238',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  rotatedButton: {
    transform: [{ rotate: '90deg' }],
  },
  iconOnly: {
    alignSelf: 'center',
  },
  reactLogo: {
    marginTop: 20,
    height: 100,
    width: 160,
    resizeMode: 'contain',
  },
  openDyslexicFont: {
  fontFamily: 'OpenDyslexicBold',
  },
  glow: {
    shadowColor: '#efefef',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20, // for Android glow
    borderColor: '#efefef',
    borderWidth: 2,
  },
});
