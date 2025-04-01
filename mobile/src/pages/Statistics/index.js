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

export default function Statistic() {

  return (
    <ScreenView>
      <View style={styles.container}>

        <Header title='Estatísticas' />

        
          <View style={styles.areaWeeks}>
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
              <TouchableOpacity key={index} style={styles.week}>
                <Text style={styles.txtWeek}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.areaPorcentagem}>
            <View style={styles.porcentagem}>
              <Text style={styles.txtPorcentagem}>25%</Text>
            </View>

            <Text style={styles.subtitulo}>Concluídos</Text>
          </View>
        

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
    gap: 15,
  },
  week: {
    width: 30,
    height: 30,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%'
  },
  areaPorcentagem: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  porcentagem: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: '50%',
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPorcentagem: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'semibold',
  },
  subtitulo: {
    fontSize: 30,
    fontWeight: 'semibold',
    color: '#fff'
  }

});
