import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import API_URL from '../../services/api';
import { useNavigation } from '@react-navigation/native';

import iconCategory from '../../services/category';

import ScreenView from '../../components/ScreenView';
import Header from '../../components/Header';

export default function Home() {
  const navigation = useNavigation()

  const [habits, setHabits] = useState([]);
  const [checkins, setCheckins] = useState([]);

  const dateNow = new Date();
  const formattedDate = dateNow.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
  const todayString = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  useEffect(() => {
    async function fetchData() {
      try {
        const [habitsRes, checkinsRes] = await Promise.all([
          axios.get(`${API_URL}/api/habits`),
          axios.get(`${API_URL}/api/checkins`),
        ]);

        setHabits(habitsRes.data);

        // Filtra os check-ins da data de hoje
        const checkinsHoje = checkinsRes.data.filter((c) => c.check_in_time.startsWith(todayString));
        setCheckins(checkinsHoje);

      } catch (e) {
        console.log('Erro ao buscar dados:', e);
      }
    };

    fetchData();
  }, []);

  // 🔹 Função para verificar se um hábito foi completado hoje
  const isCompleted = (habitId) => {
    return checkins.some((c) => c.habit === habitId && c.status === true);
  };

  // 🔹 Filtra hábitos do dia
  const habitsAFazer = habits.filter((h) => !isCompleted(h.id)).slice(0, 2);
  const habitsCompletados = habits.filter((h) => isCompleted(h.id));

  return (
    <ScreenView>
      
      <Header title='Hoje'/>
      <Text style={styles.titulo}>{formattedDate}</Text>

      <View style={styles.areaHabits}>
        {/* 🔹 Seção de hábitos À FAZER */}
        <Text style={styles.subtitulo}>À fazer</Text>
        <FlatList 
          data={habitsAFazer}
          renderItem={({ item }) => (
            <LinearGradient style={styles.habit} colors={['#5F1C8C', '#F57C8C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 2 }}>
              <View style={styles.habitRow}>
                {iconCategory(item.category, '#fff')}
                <Text style={styles.habitTitle}>{item.title}</Text>
              </View>
              <View style={styles.habitRow}>
                <Icon name='alarm' color='#fff' size={25} />
                <Text style={styles.habitTimeTxt}>
                  {new Date(`1970-01-01T${item.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </LinearGradient>
          )}
        />
        <TouchableOpacity style={styles.btnSub} onPress={() => navigation.navigate('estatistica')}>
        <Text style={styles.subtitulo2}>ver mais</Text>
        </TouchableOpacity>


        {/* 🔹 Seção de hábitos COMPLETADOS */}
        <Text style={styles.subtitulo}>Completados</Text>
        <FlatList 
          data={habitsCompletados}
          renderItem={({ item }) => (
            <LinearGradient style={styles.habit} colors={['#5F1C8C', '#F57C8C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 2 }}>
              <View style={styles.habitRow}>
              {iconCategory(item.category, '#fff')}
                <Text style={styles.habitTitle}>{item.title}</Text>
              </View>
              <View style={styles.habitRow}>
                <Icon name='alarm' color='#fff' size={25} />
                <Text style={styles.habitTimeTxt}>
                  {new Date(`1970-01-01T${item.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </LinearGradient>
          )}
        />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  areaHabits: {
    width: '100%',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
  },
  btnSub: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  subtitulo2: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#fff',
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
    justifyContent: 'space-between',
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  habitTimeTxt: {
    fontWeight: 'semibold',
    color: '#fff',
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
