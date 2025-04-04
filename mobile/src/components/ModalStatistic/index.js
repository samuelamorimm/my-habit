
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, Modal, StatusBar } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import iconCategory from '../../services/category';


export default function ModalView(props) {

  const navigation = useNavigation();
  
  function categoryFormat(c){
    if (c === 'EXERCISE') {
       return <Text style={styles.txt}>Exercícios</Text>
    } else if (c === 'HEALTH') {
      return <Text style={styles.txt}>Saúde</Text>
    }  else if (c === 'LEARNING') {
      return <Text style={styles.txt}>Aprendizado</Text>
    }  else if (c === 'WORK') {
      return <Text style={styles.txt}>Trabalho</Text>
    } else {
      return <Text style={styles.txt}>Lazer</Text>
    }
  }

  return (

    

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      <LinearGradient
        style={styles.habit}
        colors={['#5F1C8C', '#F57C8C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
      >

        <Text style={styles.titulo}>{props.h.title}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 30,}}>
        {iconCategory(props.h.category, '#FFF')}
        {categoryFormat(props.h.category)}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 30,}}>
        <Icon
            name='document-text'
            size={20}
            color='#fff'
          />
        <Text style={styles.txt}>{props.h.description}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 30,}}>
        <Icon
            name='location'
            size={20}
            color='#fff'
          />
        <Text style={styles.txt}>{props.h.location}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 30,}}>
        <Icon
            name='alarm'
            size={20}
            color='#fff'
          />
        <Text style={styles.txt}>
        {new Date(`1970-01-01T${props.h.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(`1970-01-01T${props.h.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => props.setModalVisible(false)}>
        <Icon
            name='close'
            size={30}
            color='#5F1C8C'
          />
        </TouchableOpacity>

      </LinearGradient>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {


    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Fundo escuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    


  },
  habit: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    borderWidth:2,
    borderColor: '#fff'
  },
  titulo: {
    fontSize: 35,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#fff'
  },
  categoria: {
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: 'semibold',
    color: '#fff'
  },
  txt: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'semibold',
    color: '#fff',
  }, 
  btn: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30
  }
});
