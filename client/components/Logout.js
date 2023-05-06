import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'
import CustomButton from './CustomButton';

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
    <View>
        <Text>{activeAccount ? `Welcome ${activeAccount.username}`: null}</Text>
        <CustomButton color='#c9272b' title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection:'row',
    justifyContent:'center',
    margin: 10
  }
  });
   