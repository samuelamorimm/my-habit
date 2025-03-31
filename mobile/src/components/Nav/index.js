import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Nav() {


  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Icon
                name='home'
                color='white'
                size={32}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon
                name='stats-chart'
                color='white'
                size={32}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.add}>
            <Icon
                name='add'
                color='#5F1C8C'
                size={32}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon
                name='calendar'
                color='white'
                size={32}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon
                name='person'
                color='white'
                size={32}
            />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '85%',
    position: 'absolute',
    bottom: 30,
  },
  add: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: '#5F1C8C'
  }
});
