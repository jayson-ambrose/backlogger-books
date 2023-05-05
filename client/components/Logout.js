import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'

function Logout({navigation}) {

  const setLoggedIn = useSetRecoilState(loggedInAtom)
  const [activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)

  function handleLogout () {
    fetch('http://127.0.0.1:5055/logout', {
      method: 'DELETE'
    }).then(() => {
      setActiveAccount(null)
      setLoggedIn(false)
    })
  }
    
  return(
    <View style={styles.container}>
        <Text>{activeAccount ? `Welcome ${activeAccount.username}`: null}</Text>
        <Button color='#d64d3e' title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default Logout

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
   