import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router'

import {useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAtom, loggedInAtom} from './lib/atoms'

function Login({navigation}) {


  const router = useRouter()

  const setActiveAccount =  useSetRecoilState(activeAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)

  const activeAccount = useRecoilValue(activeAtom)
  const loggedIn = useRecoilValue(loggedInAtom)

  function handleLogout (user) {
    fetch('http://127.0.0.1:5055//logout', {
      method: 'DELETE'
    }).then(() => {
      setActiveAccount({})
      setLoggedIn(false)
      router.push('/')
    })
  }
    
  return(
    <View style={styles.container}>
        <Text>Welcome {activeAccount.username}.</Text>
        <Button color='#d64d3e' title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#73b4ca',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textfield: {
      backgroundColor: '#fff',
      width: 300,
      borderWidth: 2,
      paddingLeft: 10,
      marginBottom: 5
    }
  });
   