import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function Create() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState([])

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
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
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
      />
      <TextInput
        style={styles.input}
        placeholder="Local"
        value={location}
        onChangeText={setLocation}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Local: {item.location}</Text>
            <Text>Início: {item.start_time}</Text>
            <Text>Fim: {item.end_time}</Text>
            <Text>Criado em: {new Date(item.created_at).toLocaleString()}</Text>
            <Text>Atualizado em: {new Date(item.updated_at).toLocaleString()}</Text>
          </View>
        )}
      />


      <Button
        title='Enviar'
        onPress={createdHabits}
      />
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
});
