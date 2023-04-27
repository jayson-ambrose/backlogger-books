import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'

import Login from './src/Login'

export default function Page() {  

  function navigateSearch() {
    router.push('src/Search')
  }

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Backlogger Books</Text>
        <Login />        
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
  }
});
