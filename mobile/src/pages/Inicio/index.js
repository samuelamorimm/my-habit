import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Inicio() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#261B40', '#000000']} // Defina as cores do gradiente
            style={styles.gradient}
        >

            <View style={styles.areaLogo}>
                <Text style={styles.txtLogo1}>MyHabit</Text>
                <Text style={styles.txtLogo2}>Construa o melhor de você, um hábito de cada vez.</Text>
            </View>

            <View style={styles.areaBtns}>
                <TouchableOpacity style={[styles.btn, styles.btn1]} onPress={() => navigation.navigate('login')}>
                    <Text style={styles.txtBtn1}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, styles.btn2]} onPress={() => navigation.navigate('register')}>
                    <Text style={styles.txtBtn2}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    gap: 15
  },
  txtLogo1: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  txtLogo2: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'regular',
    textAlign: 'center'
  },
  areaBtns: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    width:'100%'
  },
  btn: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 100,
  },
  btn1: {
    backgroundColor: '#fff',
    
  },
  txtBtn1:{
    color: '#5F1C8C',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn2: {
    backgroundColor: 'none',
    borderWidth: 2,
    borderColor: '#fff',
  },
  txtBtn2:{
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
