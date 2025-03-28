import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigation = useNavigation();

    const API_URL = 'http://10.19.14.121:8000/';

    async function loginUser(username, password) {
        const data = {
            username,
            password
        }

        try {
            const response = await axios.post(`${API_URL}login/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Login bem-sucedido:', response.data);
            alert('Login bem-sucedido!');
            navigation.navigate('home')
        } catch (error) {
            console.log('Erro ao fazer login:', error);
            alert('Erro ao fazer login: ' + error.response.data.non_field_errors[0]);
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
                    <Text style={styles.txt1}>Entrar</Text>
                    <Text style={styles.txt2}>Por favor, faça login na sua conta</Text>
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
                    <Text style={styles.label}>Senha:</Text>
                    <TextInput
                        placeholder="Senha"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text style={styles.txtSenha}>Esqueceu a senha?</Text>
                    </View>
                </View>


                <View style={styles.areaBtns}>
                    <TouchableOpacity style={styles.btnEntrar} onPress={() => username && password ? loginUser(username, password) : alert('Preencha suas informações corretamente')}>
                        <Text style={styles.txtBtn}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnGoogle} onPress={() => alert('Esta função será adicionada em breve!')}>
                        <Image
                            source={require('../../../assets/icon-google.png')}
                            style={styles.iconGoogle}
                        />
                        <Text style={[styles.txtBtn, styles.txtGoogle]}>Entrar com o Google</Text>
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
    txtSenha: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'semibold',
        textAlign: 'right',
        marginTop: 15,
    },
    areaForm: {
        marginTop: 70,
        marginHorizontal: 20,
        gap: 40,
    },
    input: {
        backgroundColor: '#e1e1e1',
        borderRadius: 8,
        height: 45,
        paddingLeft: 15
    },
    label: {
        color: '#fff',
        marginBottom:6,
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
        justifyContent:'center',
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
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 8,
    },
    iconGoogle: {
        width: 25,
        height: 25,
    }
});
