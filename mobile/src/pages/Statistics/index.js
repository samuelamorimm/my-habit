import ScreenView from "../../components/ScreenView";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { format, addDays, ptBR } from 'date-fns';
import { Checkbox } from "react-native-paper";
import API_URL from '../../services/api';
import iconCategory from "../../services/category";

import Header from "../../components/Header";
import ModalView from "../../components/ModalStatistic";

export default function Statistic() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [habits, setHabits] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [porcentagem, setPorcentagem] = useState(0);
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState(null);

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHabit(null);
  };

  // 👉 Busca hábitos e check-ins da data selecionada
  useEffect(() => {
    async function fetchData() {
      try {
        const habitsRes = await axios.get(`${API_URL}/api/habits`);
        const checkinsRes = await axios.get(`${API_URL}/api/checkins`);

        const habitsData = habitsRes.data;
        const checkinsDoDia = checkinsRes.data.filter(c =>
          c.check_in_time.startsWith(selectedDate)
        );

        setHabits(habitsData);
        setCheckins(checkinsDoDia);
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [selectedDate]);

  // 👉 Atualiza porcentagem sempre que check-ins ou hábitos mudarem
  useEffect(() => {
    const total = habits.length;
    const done = checkins.filter(c => c.status === true).length;
    const calc = total === 0 ? 0 : Math.round((done / total) * 100);
    setPorcentagem(calc);
  }, [habits, checkins]);

  // 👉 Fazer check-in
  const toggleCheckIn = async (habitId) => {
    try {
      const res = await axios.post(`${API_URL}/api/checkins/`, { habit: habitId });
      const updated = res.data;

      setCheckins(prev =>
        prev.some(c => c.habit === habitId)
          ? prev.map(c => (c.habit === habitId ? updated : c))
          : [...prev, updated]
      );
    } catch (error) {
      console.log("Erro ao fazer check-in:", error);
    }
  };

  // 👉 Dias da semana
  const getNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i);
      return {
        month: format(date, "MMM", { locale: ptBR }).toUpperCase(),
        day: format(date, "d"),
        fullDate: format(date, "yyyy-MM-dd"),
      };
    });
  };

  const days = getNext7Days();

  return (
    <ScreenView>
      <View style={styles.container}>
        <Header title='Estatísticas' />

        {/* Dias da semana */}
        <View style={styles.areaWeeks}>
          {days.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.week,
                selectedDate === item.fullDate && { backgroundColor: '#F57C8C' },
              ]}
              onPress={() => setSelectedDate(item.fullDate)}
            >
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={styles.dayText}>{item.day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Porcentagem */}
        <View style={styles.areaPorcentagem}>
          <View style={styles.porcentagem}>
            <Text style={styles.txtPorcentagem}>{porcentagem}%</Text>
          </View>
          <Text style={styles.subtitulo}>Seu status</Text>
        </View>

        {/* Data atual */}
        <Text style={styles.subtitulo}>Meus hábitos</Text>
        <Text style={{ color: '#fff' }}>
          {new Date(selectedDate + 'T12:00:00').toLocaleDateString()}
        </Text>

        {/* Lista de hábitos */}
        <FlatList
          data={habits}
          style={{ marginBottom: 80 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const checkinDoDia = checkins.find(c => c.habit === item.id);
            const isChecked = checkinDoDia ? checkinDoDia.status : false;

            return (
              <LinearGradient
                style={styles.habit}
                colors={['#5F1C8C', '#F57C8C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
              >
                <View style={{ gap: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    {iconCategory(item.category, "#fff")}
                    <Text style={styles.habitTitle}>{item.title}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Icon name='alarm' color='#fff' size={25} />
                    <Text style={styles.habitTimeTxt}>
                      {new Date(`1970-01-01T${item.start_time}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => openModal(item)} activeOpacity={0.9}>
                  <Icon
                    name='create'
                    size={30}
                    color='#F6B704'
                  />
                </TouchableOpacity>
                <Checkbox
                  status={isChecked ? "checked" : "unchecked"}
                  onPress={() => toggleCheckIn(item.id)}
                  color={isChecked ? "#F6B704" : "gray"}
                />
                </View>


                <Modal transparent={true} animationType='slide' visible={modalVisible} onRequestClose={closeModal} style={{ flex: 1 }}>
                  <ModalView h={selectedHabit} setSelectedHabit={setSelectedHabit} setModalVisible={setModalVisible}/>
                </Modal>

                
              </LinearGradient>
            );
          }}
        />
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
