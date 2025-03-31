import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import Nav from '../../components/Nav';

export default function Home() {


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
                  colors={['#261B40', '#000000']} // Defina as cores do gradiente
                  style={styles.gradient}
              >
      
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Home</Text>
                </View>

                <Text style={styles.titulo}>Hoje</Text>

                <View style={styles.areaHabits}>
                  <Text style={styles.subtitulo}>Próximo hábito:</Text>

                  <LinearGradient style={styles.habit} 
                    colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
                    start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
                    end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
                  >

                  </LinearGradient>
                  <Text style={styles.subtitulo}>Ainda para hoje:</Text>
                  <LinearGradient style={styles.habit} 
                    colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
                    start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
                    end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
                  >

                  </LinearGradient>
                </View>
                
                <Nav/>
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
  header: {
    marginTop: 30,
    
  },
  headerTxt: {
    fontSize: 32,
    fontWeight: 'regular',
    color: '#fff'
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
  },
  areaHabits: {
    width: '100%'
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: 'semibold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
  },
  habit: {
    height: 130,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 15,
  }
});
