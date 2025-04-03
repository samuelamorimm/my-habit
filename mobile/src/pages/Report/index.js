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

    const [selectedDate, setSelectedDate] = useState(new Date());

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
                            selectedColor: "blue",
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
                    style={{width: 300, padding: 0, margin: 0, overflow: 'hidden', borderRadius: 10 }}
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
    calendarView: {
        borderWidth: 2,
        padding: 5,
    }

});
