import React, {useState} from 'react'
import { Button, Text,  StyleSheet, View, TextInput, Pressable, Alert} from 'react-native';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'


function Login({navigation}) {

  const [userText, setUserText] = useState('')
  const [passText, setPassText] = useState('')

  const setActiveAccount = useSetRecoilState(activeAccountAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)
  
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

          }) 
        }
        else{
          Alert.alert("Login Failed", "Username or password did not match our records.")
        }  

        setUserText('')
        setPassText('')

      }).catch((error) => {
          console.log(error.message);          
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
          <Pressable onPress={() => navigation.navigate('CreateAccount')}>
            <Text>Create Account</Text>
          </Pressable>

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
   