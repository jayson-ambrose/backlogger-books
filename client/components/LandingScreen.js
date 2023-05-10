import { StyleSheet, View, Alert, Image } from "react-native";
import React, {useEffect} from 'react'
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {activeAccountAtom, loggedInAtom} from './lib/atoms'

import CustomButton from "./CustomButton";
import Login from './Login'
import Logout from './Logout'

export default function LandingScreen({navigation}) {  
    
    const [loggedIn, setLoggedIn] = useRecoilState(loggedInAtom)
    const setActiveAccount = useSetRecoilState(activeAccountAtom)

    useEffect(() => {
      fetch('http://127.0.0.1:5055/check_session')
      .then(resp => {
        if (resp.ok){
          resp.json().then(data => {
            setActiveAccount(data)
            setLoggedIn(true)
          })
        }
        else {
          setActiveAccount(null)
        }
      })
      
    }, [])

    let accountDetailsButton = (

      <CustomButton
        title={'Account Details'}
        color={loggedIn ? '#377ba4' :'#bbb6c7'}
        onPress={loggedIn ? () => navigation.navigate('AccountDetails') :
          () => Alert.alert("Log in to view account details")}/>)

    let backlogButton = (
      <CustomButton 
        title={'Backlog'}
        color={loggedIn ? '#377ba4' :'#bbb6c7'}
        onPress={loggedIn ? () => navigation.navigate('Backlog') :
           () => Alert.alert("Log in to view your backlog")}/>)

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../assets/banner.png')} 
        style={styles.banner}/>      
      {loggedIn ? <Logout />: <Login navigation={navigation}/>}       
        <View style={styles.buttonContainer}>          
          <CustomButton 
            color={'#377ba4'}
            title={'Search'} 
            onPress={() => navigation.navigate('Search')}       
          />
          <CustomButton 
            color={'#377ba4'}
            title={'Scan Barcode'} 
            onPress={() => navigation.navigate('ScanBarcode')}        
          />          
          {backlogButton}
          {accountDetailsButton}
        </View>          
    </View>     
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f6ea',
    height: '50%'
  },
  buttonContainer:{
    flex: 0,
    width: '95%',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 5,
    position: 'relative'
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  }
});