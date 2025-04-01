import ScreenView from "../../components/ScreenView";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/Ionicons';


import Nav from '../../components/Nav';
import Header from "../../components/Header";

export default function CreateHabits() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [location, setLocation] = useState('');
    const [data, setData] = useState([])
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

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
  
  
    async function createdHabits() {
  
      const data = {
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        location,
      };
  
      try {
        const response = await axios.post(API_URL, data);
  
      } catch (e) {
        console.log('Erro ao fazer o post:', e)
      }
    };

    

  return (
    <ScreenView>
      <View style={styles.container}>

            <Header title='Crie um hábito'/>
      
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />
              <TextInput
                style={styles.input}
                placeholder="Categoria"
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
              <Text style={styles.label}>Horário de inicio</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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

      
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txtBtn}>Criar</Text>
            </TouchableOpacity>
      
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
  input: {
    backgroundColor: '#e1e1e1',
    width: '80%',
    marginTop: 20,
    paddingHorizontal: 10,
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
    fontWeight:'bold',
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
  }

});
