import React, {useState} from 'react'
import { Button, StyleSheet, Text, View, Image, Alert} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { activeAccountAtom,loggedInAtom } from './lib/atoms';
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';

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
        <View style={styles.mainContainer}>
          <Image
        source={require('../assets/banner.png')} 
        style={styles.banner}/>  
          <View style={{width: "90%"}}>
            <CustomTextInput 
              placeholder={'Enter Username...'}
              value={userText}
              onChangeText={(value) => setUserText(value)}
            />
          <CustomTextInput 
              secureTextEntry={true} 
              placeholder={'Enter Password...'}
              value={passText}
              onChangeText={(value) => setPassText(value)}
            />
            <CustomTextInput 
              secureTextEntry={true} 
              placeholder={'Re-enter Password...'}
              value={rePassText}
              onChangeText={(value) => setRePassText(value)}
            />
            <CustomButton
              style={{margin: 10}} 
              title={'Create Account'} 
              onPress={() => handleSubmit(userText, passText, rePassText)}
              color='#377ba4'
            />
          </View>
        </View>
    )
}

export default CreateAccount

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f6ea',
  },
  titleLine: {
    fontSize: 20
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  }
     
  });
   