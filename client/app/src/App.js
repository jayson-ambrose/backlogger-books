import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {RecoilRoot, useRecoilValue} from 'recoil'

import Login from './Login'
import Logout from './Logout'

import {loggedInAtom, activeAtom} from './lib/atoms'


export default function App() {  

  const router = useRouter()

  const loggedIn = useRecoilValue(loggedInAtom)
  const activeAccount = useRecoilValue(activeAtom)  

  console.log(activeAccount)

  function navigateSearch() {
    router.push('src/Search')
  }

  function navigateBacklog() {
    router.push('src/Backlog')
  }

  function navigateBarcode() {
    router.push('src/BarcodeScanner')
  }

  function navigateAccount() {
    router.push('src/AccountDetails')
  }

  const logoutComponent = (
    <>
        <Text>Welcome {activeAccount.username}.</Text>
        <Button color='#e24332' title='Logout'/>
    </>
  )

  return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Backlogger Books</Text>
          {loggedIn ? <Logout />: <Login /> }      
          <Button title={'Backlog'}/>
          <Button title={'Account Details'}/>
          <Button onPress={navigateSearch} title={'Search'}/>
          <Button title={'Scan Barcode'}/>
        </View>   
      </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: '#2c666f',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: '#fff'
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  logout: {
    backgroundColor: "#e24332"
  }
});
