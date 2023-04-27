import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'

import Search from './src/Search'

export default function Page() {

  function doTheThing() {
    console.log('Tacos')
  }

  function navigateSearch() {
    router.push('src/Search')
  }

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Backlogger Books</Text>
        <Text style={{marginTop: 25}}>Login:</Text>
        <TextInput style={styles.textfield} placeholder={'Enter Username...'}/>
        <TextInput secureTextEntry={true} style={styles.textfield} placeholder={'Enter Password...'}/>
        <Button title={'Login'} onPress={doTheThing}/>
        <Link href={'/'} style={{color: 'blue'}}>Create Account</Link>
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
    backgroundColor: '#cec2ad',
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
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  textfield: {
    backgroundColor: '#fff',
    borderWidth: 2,
    paddingLeft: 10
  }
});
