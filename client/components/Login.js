import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, View, TextInput} from 'react-native';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'


function Login() {

  const [userText, setUserText] = useState('')
  const [passText, setPassText] = useState('')

  const [activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInAtom)
  
  function handleLogin(user, pass) {
      
      const credentials = {
        username: user,
        password: pass
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

            setActiveAccount(data)
            setLoggedIn(true)
            console.log(data)
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
          <Button 
            title={'Login'} 
            onPress={() => handleLogin(userText, passText)}
          />

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
   