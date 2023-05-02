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
import Backlog from './components/Backlog'
import Reviews from './components/Reviews'
import WriteReview from './components/WriteReview'
import ChangePassword from './components/ChangePassword'
import ConfirmDelete from './components/ConfirmDelete';

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
              options={{title: 'Search Open Library'}}
            />
            <Stack.Screen 
              name = 'Details'
              component ={Details}
              options={{title: 'Details'}}
            />
            <Stack.Screen 
              name = 'AccountDetails'
              component ={AccountDetails}
              options={{title: 'Account Details'}}
            />
            <Stack.Screen 
              name = 'ScanBarcode'
              component ={ScanBarcode}
              options={{title: 'ScanBarcode'}}
            />
            <Stack.Screen 
              name = 'Backlog'
              component ={Backlog}
              options={{title: 'Backlog'}}
            />
            <Stack.Screen 
              name = 'Reviews'
              component ={Reviews}
              options={{title: 'Reviews'}}
            />
            <Stack.Screen 
              name = 'WriteReview'
              component ={WriteReview}
              options={{title: 'Write Review'}}
            />
            <Stack.Screen 
              name = 'ChangePassword'
              component ={ChangePassword}
              options={{title: 'Change Password'}}
            />            
            <Stack.Screen 
              name = 'ConfirmDelete'
              component ={ConfirmDelete}
              options={{title: 'Confirm Delete'}}
            />            
          </Stack.Navigator>      
      </NavigationContainer>
    </RecoilRoot>
  );
}
 