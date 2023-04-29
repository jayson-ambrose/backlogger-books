import { StatusBar } from 'expo-status-bar';
import React from 'react';

import LandingScreen from './components/LandingScreen'
import CreateAccount from './components/CreateAccount'
import Search from './components/Search'
import Test from './components/Test'

import {RecoilRoot} from 'recoil'

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name = 'Landing Screen'
              component ={LandingScreen}
              options={{title: 'Home Screen'}}
            />
            <Stack.Screen 
              name = 'CreateAccount'
              component ={CreateAccount}
              options={{title: 'Create Account'}}
            />
            <Stack.Screen 
              name = 'Search'
              component ={Search}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen 
              name = 'Test'
              component ={Test}
              options={{title: 'Welcome'}}
            />
          </Stack.Navigator>        
      </NavigationContainer>
    </RecoilRoot>
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
 