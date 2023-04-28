import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router'

import {useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAtom, loggedInAtom} from './lib/atoms'

function Login({navigation}) {

  const [userText, setUserText] = useState('')
  const [passText, setPassText] = useState('')

  const setActiveAccount =  useSetRecoilState(activeAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)

  const activeAccount = useRecoilValue(activeAtom)
  const loggedIn = useRecoilValue(loggedInAtom)

    function handleLogin() {

      console.log(userText + ' ' +  passText)
      
      const credentials = {
        username: userText,
        password: passText
      }
      
      fetch('http://127.0.0.1:5055/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)

      }).then(resp => {
        if (resp.ok) {
          resp.json().then(data => {

            console.log('made it here')

            setActiveAccount(data)

            setLoggedIn(true)

          }) 
        }

        setUserText('')
        setPassText('')

      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
    }

    console.log(activeAccount)
    console.log(loggedIn)

    return(
      <View style={styles.container}>
          <TextInput 
            style={styles.textfield}
            placeholder={'Enter Username...'}
            value={userText}
            onChangeText={(value) => setUserText(value)}
          />
          <TextInput 
            secureTextEntry={true} 
            style={styles.textfield} 
            placeholder={'Enter Password...'}
            value={passText}
            onChangeText={(value) => setPassText(value)}
          />
          <Button title={'Login'} onPress={handleLogin}/>
          <Link href={'/src/CreateAccount'} style={{color: 'blue'}}>Create Account</Link>
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
   