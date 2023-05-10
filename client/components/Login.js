import React, {useState} from 'react'
import { StyleSheet, View, TextInput, Alert} from 'react-native';
import { useSetRecoilState } from 'recoil'
import { activeAccountAtom, loggedInAtom } from './lib/atoms'
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';


function Login({navigation}) {

  const setActiveAccount = useSetRecoilState(activeAccountAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)

  const [userText, setUserText] = useState('')
  const [passText, setPassText] = useState('')  

  function handleChangeUserText(value) {
    setUserText(value)
  }
  function handleChangePassText(value) {
    setPassText(value)
  }
  
  function handleLogin(user, pass) {

    if (user.length < 5 || user.length > 15){
      Alert.alert('Username must be 5 to 15 characters long and must be unique.')
      return
    }

    if (pass.length < 5 || pass.length > 35) {
      Alert.alert('Password must be 5 to 34 characters long.')
    }
      
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
      <View>
          <CustomTextInput 
            placeholder={'Enter Username...'}
            handleChangeText={handleChangeUserText}
            controlledText={userText}
            highlightColor = "#60292e"
          />

          <CustomTextInput 
            placeholder={'Enter Password...'}
            handleChangeText={handleChangePassText}
            controlledText={passText}
            secure={true}
            highlightColor = "#60292e"
            submitEditing={() => handleLogin(userText, passText)}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              width={'45%'}
              color={'#377ba4'} 
              title={'Login'} 
              onPress={() => handleLogin(userText, passText)}
            />
            <CustomButton
              width={'45%'}
              color={'#377ba4'} 
              title={'Sign Up'} 
              onPress={() => navigation.navigate('CreateAccount')}
            />
          </View>

      </View>
    )
}

export default Login

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-around',
    margin: 10
  }
});
   