import { StyleSheet, Text, View, Button } from "react-native";
import React from 'react'
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'

import Login from './Login'
import Logout from './Logout'

export default function LandingScreen({navigation}) {  
    
    const loggedIn = useRecoilValue(loggedInAtom)

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Backlogger Books</Text>
        {loggedIn ? <Logout />: <Login navigation={navigation}/> }      
        <Button title={'Backlog'}/>
        <Button title={'Account Details'} onPress={() => navigation.navigate('AccountDetails')}/>
        <Button title={'Search'} onPress={() => navigation.navigate('Search')}/>
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