import React, {useState} from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { activeAccountAtom,loggedInAtom } from './lib/atoms';
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';

function ChangePassword({ navigation }) {

  const [activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)
  const setLoggedIn = useSetRecoilState(loggedInAtom)

  const [oldPassText, setOldPassText] = useState('')
  const [passText, setPassText] = useState('')
  const [rePassText, setRePassText] = useState('')

  function handleChangePassText(value) {
    setPassText(value)
  }

  function handleChangeOldPassText(value) {
    setOldPassText(value)
  }
  
  function handleChangeRePassText(value) {
    setRePassText(value)    
  }

  function handleSubmit(oldPass, pass, rePass) {

    if (pass.length < 5 || pass.length > 35) {
      Alert.alert('Password must be 5 to 34 characters long.')
      return
    }    
    
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
        <View style={styles.mainContainer}>
            <Image
            source={require('../assets/banner.png')} 
            style={styles.banner}/>  
          <View style={{width: '90%'}}>
            <CustomTextInput 
                secure={true} 
                placeholder={'Enter current password...'}
                controlledText={oldPassText}
                handleChangeText={(value) => setOldPassText(value)}
                highlightColor={'#60292e'}
            />
            <CustomTextInput 
                secure={true} 
                placeholder={'Enter new password...'}
                controlledText={passText}
                handleChangeText={(value) => setPassText(value)}
                highlightColor={'#60292e'}
            />
            <CustomTextInput 
                secure={true} 
                placeholder={'Re-enter new password...'}
                controlledText={rePassText}
                handleChangeText={(value) => setRePassText(value)}
                highlightColor={'#60292e'}
            />
            <CustomButton 
                title={'Change Password'} 
                onPress={() => handleSubmit(oldPassText, passText, rePassText)}
                color={'#377ba4'}
            />
          </View>
        </View>
    )
}

export default ChangePassword

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
   