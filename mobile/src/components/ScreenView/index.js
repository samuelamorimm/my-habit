import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView, Keyboard } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import Nav from '../../components/Nav';

export default function ScreenView({ children }) {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#261B40', '#000000']} // Defina as cores do gradiente
        style={styles.gradient}
      >
        
          {children}
          
        
        {!isKeyboardVisible && <Nav />}
      </LinearGradient>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 25
  },
});
