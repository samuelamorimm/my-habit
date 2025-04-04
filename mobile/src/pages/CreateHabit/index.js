import ScreenView from "../../components/ScreenView";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';


import Nav from '../../components/Nav';
import Header from "../../components/Header";
import API_URL from "../../services/api";

export default function CreateHabits() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('EXERCISE');

  

  const startDateTime = () => {
    DateTimePickerAndroid.open({
      value: startTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setStartTime(selectedDate);
        }
      },
    });
  };

  const endDateTime = () => {
    DateTimePickerAndroid.open({
      value: endTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setEndTime(selectedDate);
        }
      },
    });
  };


  function formatTime(date) {
    return date.toTimeString().split(" ")[0];
  }
  
  async function createdHabits() {
    const data = {
      title,
      description,
      start_time: formatTime(startTime),
      end_time: formatTime(endTime),
      location,
      category,
      user: 1,
    };
  
    console.log("Enviando dados:", data); // Debug
    try {
      const response = await axios.post(`${API_URL}/api/habits/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Sucesso!", response.data);
    } catch (e) {
      console.log("Erro ao fazer o post:", e);
    }
  }
  



  return (
    <ScreenView>
      <ScrollView style={{width: '100%'}}>
      <View style={styles.container}>

        <Header title='Crie um hábito' />

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.viewPicker}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Exercício" value="EXERCISE" />
            <Picker.Item label="Saúde" value="HEALTH" />
            <Picker.Item label="Aprendizado" value="LEARNING" />
            <Picker.Item label="Trabalho" value="WORK"/>
            <Picker.Item label="Lazer" value="LEISURE"/>
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Local"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        {/* <TextInput
              style={styles.input}
              placeholder="Horário de Início (HH:MM:SS)"
              value={startTime}
              onChangeText={setStartTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Horário de Fim (HH:MM:SS)"
              value={endTime}
              onChangeText={setEndTime}
            /> */}

        <View style={styles.areaTime}>
          <Text style={styles.label}>Horário de início</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity style={styles.btnTime} onPress={startDateTime}>
              <Icon
                name='calendar'
                size={32}
                color='#5F1C8C'
              />
            </TouchableOpacity>
            <Text style={styles.txtBtnTime}>Hora:  {startTime.toLocaleTimeString().slice(0, -3)}</Text>
          </View>
        </View>

        <View style={styles.areaTime}>
          <Text style={styles.label}>Horário de fim</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity style={styles.btnTime} onPress={endDateTime}>
              <Icon
                name='calendar'
                size={32}
                color='#5F1C8C'
              />
            </TouchableOpacity>
            <Text style={styles.txtBtnTime}>Hora:  {endTime.toLocaleTimeString().slice(0, -3)}</Text>
          </View>
        </View>


        <TouchableOpacity style={styles.btn} onPress={() => {
          createdHabits();
        }}>
          <Text style={styles.txtBtn}>Criar</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginBottom: 80,
  },
  input: {
    backgroundColor: '#e1e1e1',
    width: '80%',
    marginTop: 20,
    paddingHorizontal: 15,
    height: 45,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#5F1C8C',
    width: '50%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: '10%'
  },
  txtBtn: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  areaTime: {
    marginTop: 20,
    width: '80%',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnTime: {

    backgroundColor: '#fff',
    width: '20%',
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  txtBtnTime: {
    color: '#fff',
    fontWeight: 'semi-bold'
  },
  picker: {
    width: '100%',
    padding: 0,
    borderRadius: 10,
    color: 'gray',
    fontSize: 16,
  },
  viewPicker: {
    width: '80%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#e1e1e1'
  },

});
