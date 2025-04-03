import ScreenView from "../../components/ScreenView";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/Ionicons';
import { format, addDays, ptBR } from 'date-fns';
import { Checkbox } from "react-native-paper";


import Nav from '../../components/Nav';
import Header from "../../components/Header";

export default function Statistic() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [habits, setHabits] = useState([]);

  const API_URL = 'http://10.19.14.121:8000/api/habits/';
  const CHECKIN_URL = 'http://10.19.14.121:8000/api/checkins/';

  useEffect(() => {
    async function getHabits() {
      try {
        // Busca os hábitos
        const habitsResponse = await axios.get(API_URL);
        const habitsData = habitsResponse.data;
  
        // Busca os check-ins
        const checkinsResponse = await axios.get(CHECKIN_URL);
        const checkins = checkinsResponse.data;
  
        // Obtém a data atual no formato "YYYY-MM-DD"
        const today = format(new Date(), "yyyy-MM-dd");
  
        // Atualiza os hábitos, verificando se há check-in para hoje
        const updatedHabits = habitsData.map((habit) => {
          const isCheckedToday = checkins.some(
            (checkin) => checkin.habit === habit.id && checkin.date === today
          );
          return { ...habit, checked: isCheckedToday };
        });
  
        setHabits(updatedHabits);
      } catch (error) {
        console.log("Erro ao buscar hábitos:", error);
      }}
    getHabits();
  }, [])

  // Marcar ou desmarcar o check-in
  const toggleCheckIn = async (habit) => {
    try {
      await axios.post(CHECKIN_URL, {
        habit: habit.id,
        status: !habit.checked, // Alterna o status
      });

      // Atualiza a lista localmente
      setHabits((prevHabits) =>
        prevHabits.map((h) =>
          h.id === habit.id ? { ...h, checked: !habit.checked } : h
        )
      );
    } catch (error) {
      console.log("Erro ao marcar check-in:", error);
    }
  };
  

  const filteredHabits = habits.filter(habit => habit.start_time.includes(selectedDate));


  const getNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i);
      return {
        month: format(date, "MMM", { locale: ptBR }).toUpperCase(), // Nome do mês
        day: format(date, "d"), // Dia do mês
        fullDate: format(date, "yyyy-MM-dd"),
      };
    });
  };

  const days = getNext7Days();

  return (
    <ScreenView>
      <View style={styles.container}>

        <Header title='Estatísticas' />


        <View style={styles.areaWeeks}>
          {days.map((item, index) => (
            <TouchableOpacity key={index} style={styles.week} onPress={() => setSelectedDate(item.fullDate)}>
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={styles.dayText}>{item.day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.areaPorcentagem}>
          <View style={styles.porcentagem}>
            <Text style={styles.txtPorcentagem}>25%</Text>
          </View>

          <View>
            <Text style={styles.subtitulo}>Seu status</Text>
          </View>
        </View>

        <Text style={styles.subtitulo}>Meus hábitos</Text>

        <FlatList
          data={habits}
          style={{marginBottom: 80}}
          renderItem={({ item }) => 
          <TouchableOpacity>
          <LinearGradient style={styles.habit}
            colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
            start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
            end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
          >
            <View style={{gap: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
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
            </View>

            <View style={styles.checkboxArea}>
              <Checkbox
                status={item.checked ? "checked" : "unchecked"}
                onPress={() => toggleCheckIn(item)}
                color={item.checked ? "#F6B704" : "gray"}  // Define a cor quando marcado
              />
            </View>

          </LinearGradient>
          </TouchableOpacity>
          }
        />
        {/* fim do FLATLIST */}


      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  areaWeeks: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 30,
  },
  week: {
    width: 40,
    height: 50,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  areaPorcentagem: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    flexDirection: 'row'
  },
  porcentagem: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderRadius: '50%',
    borderColor: '#F57C8C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPorcentagem: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'semibold',
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  monthText: {
    color: '#5F1C8C',
    fontSize: 14,
    fontWeight: 'semibold'
  },
  dayText: {
    color: '#5F1C8C',
    fontWeight: 'bold',
    fontSize: 18
  },
  habit: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
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
