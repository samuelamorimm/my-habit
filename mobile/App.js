import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Inicio from './src/pages/Inicio';
import Login from './src/pages/Login';
import Register from './src/pages/Register';

import Home from './src/pages/Home';
import CreateHabits from './src/pages/CreateHabit';
import Statistic from './src/pages/Statistics';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
        <Stack.Screen name='inicio' component={Inicio}/>
        <Stack.Screen name='register' component={Register}/>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='criarHabito' component={CreateHabits}/>
        <Stack.Screen name='estatistica' component={Statistic}/>
      </Stack.Navigator>
    </NavigationContainer>
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
