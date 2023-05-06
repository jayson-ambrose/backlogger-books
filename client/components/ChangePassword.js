import React, {useState} from 'react'
import { Button, StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { activeAccountAtom,loggedInAtom } from './lib/atoms';

function ChangePassword({ navigation }) {

  const [activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)

  const [oldPassText, setOldPassText] = useState('')
  const [passText, setPassText] = useState('')
  const [rePassText, setRePassText] = useState('')

  function handleSubmit(oldPass, pass, rePass) {
    
      const credentials = {
          type: 'change_pw',
          old_password: oldPass,
          password: pass,
          re_password: rePass
      }
      fetch(`http://127.0.0.1:5055/users/${activeAccount.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify(credentials)
      })
      .then(resp => {
          if(resp.ok){
              resp.json().then(data => {
                Alert.alert("Password Changed")
                navigation.navigate('LandingScreen')                
              })
          }
          else {
            Alert.alert("Change Password Failed", "Password invalid or was the same as your previous password")
          }
      })
  }

    return(
        <View>
          <View>
            <View>
                <TextInput 
                    secureTextEntry={true} 
                    placeholder={'Enter current password...'}
                    value={oldPassText}
                    onChangeText={(value) => setOldPassText(value)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    placeholder={'Enter new password...'}
                    value={passText}
                    onChangeText={(value) => setPassText(value)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    placeholder={'Re-enter new password...'}
                    value={rePassText}
                    onChangeText={(value) => setRePassText(value)}
                />
                <Button 
                    title={'Change Password'} 
                    onPress={() => handleSubmit(oldPassText, passText, rePassText)}
                />
            </View>
          </View>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
     
  });
   