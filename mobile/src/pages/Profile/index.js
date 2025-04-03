import ScreenView from "../../components/ScreenView";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


import Nav from '../../components/Nav';
import Header from "../../components/Header";

export default function Profile({setIsAuthenticated}) {

    const navigation = useNavigation();

    async function logoutUser(){
        try {
            await AsyncStorage.removeItem('authToken'); // remove o token salvo
            setIsAuthenticated(false)
        } catch (e) {
            console.log('erro ao fazer logout:', e)
        }
    }

    return (
        <ScreenView>
            <View style={styles.container}>

                <Header title='Perfil' />

                <View style={styles.areaPhoto}>
                    <LinearGradient style={styles.gradient}
                        colors={['#5F1C8C', '#F57C8C']} // Defina as cores do gradiente
                        start={{ x: 0, y: 0 }} // Começa no canto superior esquerdo
                        end={{ x: 1, y: 2 }}   // Termina no canto inferior direito (diagonal)
                    >
                        <Icon
                            name="person"
                            color='#fff'
                            size={70}
                        />
                    </LinearGradient>
                </View>

                <Text style={styles.username}>Username</Text>



                {[
                    'Informações do Usuário', 'Configuração da Conta', 'Personalização', 'Suporte e Legal', 'Segurança'
                ].map((txt, index) => (
                    <TouchableOpacity style={styles.btnConfig} key={index}>
                        <Text style={styles.btnConfigTxt}>{txt}</Text>
                        <Icon
                            name="play"
                            size={20}
                            color='#fff'
                        />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.btnLogout} onPress={logoutUser}>
                    <Icon
                        name="log-out"
                        color='#fff'
                        size={20}
                    />
                    <Text style={styles.txtBtnLogout}>Sair da conta</Text>
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
    areaPhoto: {
        width: 120,
        height: 120,
        marginTop: 20,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120,
    },
    username: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        marginTop: 20,
        color: '#fff',
        marginBottom: 20,
    },
    btnConfig: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25
    },
    btnConfigTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'semibold',
        fontFamily: 'monospace',
    },
    btnLogout: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        gap: 10,
        padding: 5,
    },
    txtBtnLogout: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'monospace'
    }

});
