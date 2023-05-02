import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, {useEffect} from 'react'
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'

import Login from './Login'
import Logout from './Logout'

export default function LandingScreen({navigation}) {  
    
    const [loggedIn, setLoggedIn] = useRecoilState(loggedInAtom)
    const setActiveAccount = useSetRecoilState(activeAccountAtom)

    useEffect(() => {
      fetch('http://127.0.0.1:5055/check_session')
      .then(resp => {
        if (resp.ok){
          resp.json().then(data => {
            setActiveAccount(data)
            setLoggedIn(true)
          })
        }
        else {
          setActiveAccount(null)
          

        }
      })
      
    }, [])

    let accountDetailsButton = (

      <Button
        title={'Account Details'}
        color='#adc6ec'
        onPress={() => Alert.alert("Log in to view account details")}/>)

    let backlogButton = (
      <Button 
        title={'Backlog'}
        color='#adc6ec'
        onPress={() => Alert.alert("Log in to view your backlog")}/>)    

    if (loggedIn){
      accountDetailsButton = (
        <Button 
          title={'Account Details'} 
          onPress={() => navigation.navigate('AccountDetails')}/>)

      backlogButton = (
        <Button title={'Backlog'}
        onPress={() => navigation.navigate('Backlog')}/>)
    }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Backlogger Books</Text>
        {loggedIn ? <Logout />: <Login navigation={navigation}/> }
        {accountDetailsButton}
        {backlogButton}
        <Button 
          title={'Search'} 
          onPress={() => navigation.navigate('Search')}        
        />
        <Button 
          title={'Scan Barcode'} 
          onPress={() => navigation.navigate('ScanBarcode')}
        />
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