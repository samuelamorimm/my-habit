import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Inicio from './src/pages/Inicio';
import Login from './src/pages/Login';
import Register from './src/pages/Register';

import Home from './src/pages/Home';
import Statistic from './src/pages/Statistics';
import CreateHabits from './src/pages/CreateHabit';
import Report from './src/pages/Report';
import Profile from './src/pages/Profile';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Stack = createStackNavigator();

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem('authToken')

      if (token) {
        setIsAuthenticated(true)
        console.log(isAuthenticated)
      }
    }
    checkToken();
  }, []);

  return (
    <NavigationContainer>

      {isAuthenticated ? (
        <Stack.Navigator initialRouteName='home' screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='criarHabito' component={CreateHabits} />
          <Stack.Screen name='estatistica' component={Statistic} />
          <Stack.Screen name='relatorio' component={Report} />
          <Stack.Screen name='perfil'>
            {(props) => <Profile {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName='inicio' screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
          <Stack.Screen name='inicio' component={Inicio} />
          <Stack.Screen name='register' component={Register} />
          <Stack.Screen name='login'>
            {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}

    </NavigationContainer>
  );
}
