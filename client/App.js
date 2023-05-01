import React from 'react';
import {RecoilRoot} from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LandingScreen from './components/LandingScreen'
import CreateAccount from './components/CreateAccount'
import Search from './components/Search'
import ScanBarcode from './components/ScanBarcode'
import Details from './components/Details'
import AccountDetails from './components/AccountDetails'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name = 'LandingScreen'
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
              options={{title: 'Find Titles'}}
            />
            <Stack.Screen 
              name = 'Details'
              component ={Details}
              options={{title: 'Details'}}
            />
            <Stack.Screen 
              name = 'AccountDetails'
              component ={AccountDetails}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen 
              name = 'ScanBarcode'
              component ={ScanBarcode}
              options={{title: 'ScanBarcode'}}
            />
          </Stack.Navigator>      
      </NavigationContainer>
    </RecoilRoot>
  );
}
 