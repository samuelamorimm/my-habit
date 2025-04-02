import ScreenView from "../../components/ScreenView";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from "react-native-calendars";


import Nav from '../../components/Nav';
import Header from "../../components/Header";

export default function Report() {

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0]; // Retorna "YYYY-MM-DD"
    };

    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-"); // Divide a string "2025-04-01"
        return `${day}/${month}/${year}`; // Retorna no formato "01/04/2025"
    };
    
   
    

    return (
        <ScreenView>
            <View style={styles.container}>

                <Header title='Relatórios' />



                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            marked: true,
                            selectedColor: "#5F1C8C",
                        },
                    }}
                    theme={{
                        backgroundColor: "#e1e1e1",
                        calendarBackground: "#e1e1e1",
                        textSectionTitleColor: "#5F1C8C",
                        selectedDayBackgroundColor: "#5F1C8C",
                        selectedDayTextColor: "white",
                        todayTextColor: "#5F1C8C",
                        arrowColor: "black",
                    }}
                    style={{ width: 280, padding: 0, margin: 0, overflow: 'hidden', borderRadius: 10, marginTop: 20 }}
                />

                <View>
                    <Text style={styles.subtitulo}>Data: {formatDate(selectedDate)}</Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    alert('')
                }}>
                    <Text style={styles.txtBtn}>Exibir Relatório</Text>
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
    calendarView: {
        borderWidth: 2,
        padding: 5,
    },
    subtitulo: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: '#5F1C8C',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: '10%'
    },
    txtBtn: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

});
