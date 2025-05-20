import { Image } from 'expo-image';
import { StyleSheet, View, Alert, Pressable, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import Screen from '@/components/Screen';

export default function HomeScreen() {
  
  const router = useRouter();
  const [isMenuMode, setIsMenuMode] = useState(false);
  
  const [toggledButtons, setToggledButtons] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);

  const toggleButton = (index: number) => {
  setToggledButtons(prev => {
    const newState = [...prev] as [boolean, boolean, boolean];
    newState[index] = !newState[index];
    return newState;
  });
};

  return (
    <View style={styles.container}>
      <Screen />

    
      {/* Right side with buttons */}
      <ThemedView style={styles.rightBox}>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.bevelButton, toggledButtons[0] && styles.glow]}
            onPress={() => {
              toggleButton(0);
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
              setIsMenuMode(prev => !prev);
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
        <TouchableOpacity style={styles.scrollButton}>
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
