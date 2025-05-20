// components/ScreenBox.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';


export default function Screen() {

  const exampleLines = [
    'Line 1: Welcome to Gabi!',
    'Line 2: This is an example screen.',
    'Line 3: Using Dyslexic friendly font.',
    'Line 4: Buttons are on the right, for speak, listen, and menu.',
    'Line 5: Press buttons far right to simulate scroll wheel'
  ];

    const scrollUp = () => {
      setHighlightIndex(prev => (prev - 1 + exampleLines.length) % exampleLines.length);
    };
  
    const scrollDown = () => {
      setHighlightIndex(prev => (prev + 1) % exampleLines.length);
    };

    const [highlightIndex, setHighlightIndex] = useState(0);

  return (
    <ThemedView style={styles.leftBoxOuter}>
      <ThemedView style={styles.leftBoxInner}>
        <ScrollView style={styles.scrollArea}>
          {exampleLines.map((line, index) => (
            <Text
              key={index}
              style={[styles.lineText, index === highlightIndex && styles.highlightedLine]}
            >
              {line}
            </Text>
          ))}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  leftBoxOuter: {
    flex: 3,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  leftBoxInner: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
  },
  scrollArea: {
    flex: 1,
  },
  lineText: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
    fontFamily: 'OpenDyslexic',
  },
  highlightedLine: {
    backgroundColor: '#FFEB3B',
  },
});
