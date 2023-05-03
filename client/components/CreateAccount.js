import React, {useState} from 'react'
import { Button, StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { activeAccountAtom,loggedInAtom } from './lib/atoms';

function CreateAccount({ navigation }) {

  const setActiveAccount = useSetRecoilState(activeAccountAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)

  const [userText, setUserText] = useState('')
  const [passText, setPassText] = useState('')
  const [rePassText, setRePassText] = useState('')

  function handleSubmit(user, pass, rePass) {
    
      const credentials = {
         username: user,
          password: pass,
          re_password: rePass
      }
      fetch('http://127.0.0.1:5055/users', {
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify(credentials)
      })
      .then(resp => {
          if(resp.ok){
              resp.json().then(data => {
                setActiveAccount(data)
                setLoggedIn(true)
                navigation.navigate('LandingScreen')                
              })
          }
          else {
            Alert.alert("Account Creation Failed", "Username may have already been taken or passwords didn't match")
          }
      })
  }

    return(
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.containertwo}>
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
              <TextInput 
                secureTextEntry={true} 
                style={styles.textfield} 
                placeholder={'Re-enter Password...'}
                value={rePassText}
                onChangeText={(value) => setRePassText(value)}
              />
              <Button 
                title={'Create Account'} 
                onPress={() => handleSubmit(userText, passText, rePassText)}
              />
            </View>
          </View>
        </View>
    )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 24,
      backgroundColor: '#2c666f',
    },
    containertwo: {
      flex: 1,
      backgroundColor: '#73b4ca',
      alignItems: 'center',
      justifyContent: 'center',
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
    textfield: {
        backgroundColor: '#fff',
        width: 300,
        borderWidth: 2,
        paddingLeft: 10,
        marginBottom: 5
      }   
  });
   