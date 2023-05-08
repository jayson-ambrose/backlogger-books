import React from 'react';
import {RecoilRoot} from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ChangePassword from './components/ChangePassword'
import AccountDetails from './components/AccountDetails'
import LandingScreen from './components/LandingScreen'
import CreateAccount from './components/CreateAccount'
import ConfirmDelete from './components/ConfirmDelete'
import ScanBarcode from './components/ScanBarcode'
import WriteReview from './components/WriteReview'
import Details from './components/Details'
import Backlog from './components/Backlog'
import Reviews from './components/Reviews'
import Search from './components/Search'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name = 'LandingScreen'
              component ={LandingScreen}
              options={{
                title: 'Home Screen',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }
              }}
            />
            <Stack.Screen 
              name = 'CreateAccount'
              component ={CreateAccount}
              options={{
                title: 'Create Account',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'Search'
              component ={Search}
              options={{
                title: 'Search Open Library',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'Details'
              component ={Details}
              options={{
                title: 'Details',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'AccountDetails'
              component ={AccountDetails}
              options={{
                title: 'Account Details',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'ScanBarcode'
              component ={ScanBarcode}
              options={{
                title: 'ScanBarcode',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'Backlog'
              component ={Backlog}
              options={{
                title: 'Backlog',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'Reviews'
              component ={Reviews}
              options={{
                title: 'Reviews',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'WriteReview'
              component ={WriteReview}
              options={{
                title: 'Write Review',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />
            <Stack.Screen 
              name = 'ChangePassword'
              component ={ChangePassword}
              options={{
                title: 'Change Password',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />            
            <Stack.Screen 
              name = 'ConfirmDelete'
              component ={ConfirmDelete}
              options={{
                title: 'Confirm Delete',
                headerStyle: {
                  backgroundColor: '#f8f6ea'
                },
                headerTintColor: '#091e2b',
                headerTitleStyle: {
                  color: '#60292e'
                }}}
            />            
          </Stack.Navigator>      
      </NavigationContainer>
    </RecoilRoot>
  );
}
 