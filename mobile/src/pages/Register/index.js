import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_URL from '../../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  

  async function registerUser(username, email, password) {

    const data = {
      username,
      email,
      password
    }

    try {
      const response = await axios.post(`${API_URL}/register/`, data, {
        headers: {
          'Content-Type': 'application/json', // Adicionando o cabeçalho para indicar que estamos enviando JSON
        }
      });
      console.log('Usuário registrado com sucesso:', response.data);
      alert('Usuário registrado com sucesso!')
    } catch (error) {
      console.log('Erro ao registrar:', error);
      alert('Erro ao registrar: ' + error.response.data.error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>

      <LinearGradient
        colors={['#261B40', '#000000']} // Defina as cores do gradiente
        style={styles.gradient}
      >


        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' size={32} color='#ffffff' />
          <Text style={styles.txtBtnBack}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.areaTextos}>
          <Text style={styles.txt1}>Registre-se</Text>
          <Text style={styles.txt2}>Por favor, crie uma nova conta</Text>
        </View>


        <View style={styles.areaForm}>
          <View style={styles.areaInput}>
            <Text style={styles.label}>Usuário:</Text>
            <TextInput
              placeholder="Usuário"
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <View style={styles.areaInput}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.areaInput}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              placeholder="Senha"
              style={styles.input}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.txtPriv}>Concordo com todos os termos de uso  e privacidade.</Text>
          </View>
        </View>


        <View style={styles.areaBtns}>
          <TouchableOpacity style={styles.btnEntrar} onPress={() => username && email && password ? registerUser(username, email, password) : alert('Preencha suas informações corretamente')}>
            <Text style={styles.txtBtn}>Registrar</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </SafeAreaView>
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
    paddingTop: 25,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    marginLeft: 20,
    width: 100
  },
  txtBtnBack: {
    color: '#fff',
    fontSize: 18,
  },
  areaTextos: {
    marginTop: 40,
    marginLeft: 20,
    gap: 10,
  },
  txt1: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  txt2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'semibold',
  },
  txtPriv: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'left',
    marginTop: 15,
  },
  areaForm: {
    marginTop: 60,
    marginHorizontal: 20,
    gap: 30,
  },
  input: {
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    height: 45,
    paddingLeft: 15
  },
  label: {
    color: '#fff',
    marginBottom: 6,
  },
  areaBtns: {
    borderColor: '#fff',
    marginHorizontal: 20,
    marginTop: 40,
    gap: 40,
  },
  btnEntrar: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtBtn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  txtGoogle: {
    color: '#5F1C8C'
  },
  btnGoogle: {
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 8,
  },
  iconGoogle: {
    width: 25,
    height: 25,
  }
});
