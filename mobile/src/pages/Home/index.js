import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import Nav from '../../components/Nav';
import ScreenView from '../../components/ScreenView';
import Header from '../../components/Header';

export default function Home() {
  const [data, setData] = useState([])
  const dateNow = new Date()
  const formattedDate = dateNow.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });

  
  const API_URL = 'http://10.19.14.121:8000/api/habits/'

  useEffect(() => {
    async function getHabits() {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
        console.log(response.data)
      } catch (e) {
        console.log('Erro ao consumir api:', e)
      }
    };

    getHabits();
  }, [])

  return (
    <ScreenView>

      <Header title='Hoje' />
      <Text style={styles.titulo}>{formattedDate}</Text>

      <View style={styles.areaHabits}>
        <Text style={styles.subtitulo}>À fazer</Text>

        <FlatList 
          data={data}
          renderItem={({item}) => <LinearGradient style={styles.habit}
          colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
          start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
          end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <Icon
              name='fitness'
              color='#fff'
              size={25}

            />

            <Text style={styles.habitTitle}>{item.title}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
            <Icon name='alarm' color='#fff' size={25} />
            
            <Text style={styles.habitTimeTxt}>
              {new Date(`1970-01-01T${item.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  
            </Text>
          </View>

        </LinearGradient>}
        /> 
        {/* fim do FLATLIST */}

        

        <Text style={styles.subtitulo}>Completados</Text>
        <LinearGradient style={styles.habit}
          colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
          start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
          end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <Icon
              name='fitness'
              color='#fff'
              size={25}

            />

            <Text style={styles.habitTitle}>Treino da tarde</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
            <Icon name='alarm' color='#fff' size={25} />
            <Text style={styles.habitTimeTxt}>17:00</Text>
          </View>

        </LinearGradient>

        <LinearGradient style={styles.habit}
          colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
          start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
          end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <Icon
              name='fitness'
              color='#fff'
              size={25}

            />

            <Text style={styles.habitTitle}>Treino da tarde</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
            <Icon name='alarm' color='#fff' size={25} />
            <Text style={styles.habitTimeTxt}>17:00</Text>
          </View>

        </LinearGradient>
      </View>

      <Nav />
    </ScreenView>
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
  titulo: {
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'regular',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  areaHabits: {
    width: '100%'
  },
  subtitulo: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
  },
  habit: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  habitTimeTxt: {
    fontWeight: 'semibold',
    color: '#fff'
  }

});
