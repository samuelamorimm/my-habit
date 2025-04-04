import ScreenView from "../../components/ScreenView";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import { Calendar } from "react-native-calendars";
import Icon from 'react-native-vector-icons/Ionicons';
import API_URL from '../../services/api';
import Header from "../../components/Header";
import { Checkbox } from "react-native-paper";
import iconCategory from "../../services/category";

export default function Report() {
    const getCurrentDate = () => new Date().toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [habits, setHabits] = useState([]);
    const [checkins, setCheckins] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    const fetchHabitsAndCheckins = async () => {
        try {
            const habitsResponse = await axios.get(`${API_URL}/api/habits`);
            const checkinsResponse = await axios.get(`${API_URL}/api/checkins`);

            setHabits(habitsResponse.data);

            // Filtra os check-ins do dia selecionado
            const checkinsDoDia = checkinsResponse.data.filter(c => c.check_in_time.startsWith(selectedDate));
            setCheckins(checkinsDoDia);

            setModalVisible(true); // Abre o modal ao buscar os dados
        } catch (error) {
            console.log("Erro ao buscar hábitos e check-ins:", error);
        }
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

                <TouchableOpacity style={styles.btn} onPress={fetchHabitsAndCheckins}>
                    <Text style={styles.txtBtn}>Exibir Relatório</Text>
                </TouchableOpacity>

                {/* MODAL PARA EXIBIR OS HÁBITOS */}
                <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Hábitos de {formatDate(selectedDate)}</Text>

                            <FlatList
                                data={habits}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                    const checkinDoDia = checkins.find(c => c.habit === item.id);
                                    const isChecked = checkinDoDia ? checkinDoDia.status : false;

                                    return (
                                        <View style={styles.habitItem}>
                                            {iconCategory(item.category, '#5F1C8C')}
                                            <Text style={styles.habitText}>{item.title}</Text>
                                            <Checkbox status={isChecked ? "checked" : "unchecked"} color={isChecked ? "#5F1C8C" : "gray"} />
                                        </View>
                                    );
                                }}
                            />

                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
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
        marginTop: '10%',
    },
    txtBtn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5F1C8C',
        textAlign: 'center',
        marginBottom: 15,
    },
    habitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    habitText: {
        fontSize: 18,
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#F57C8C',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
