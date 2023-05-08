import React from 'react'
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loggedInAtom, activeAccountAtom } from './lib/atoms';
import CustomButton from './CustomButton';

function ConfirmDelete({navigation}) {

    const setLoggedIn = useSetRecoilState(loggedInAtom)
    const [activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)

    function handleDelete() {

        fetch(`http://127.0.0.1:5055/users/${activeAccount.id}`, {
            method: 'DELETE'
        })
        .then(resp => {
            if (resp.ok){        
                navigation.navigate('LandingScreen')
                setLoggedIn(false)
                setActiveAccount(null)}  
            }
        )
    }

    return(
        <View style={styles.mainContainer}>
            <Text style={{width: '85%'}}>
                Are you sure you want to delete your account? 
                This action cannot be undone. All of your 
                reviews and backlogged books will also be
                deleted.
            </Text>
            <CustomButton 
                title="Delete Account"
                color='#c9272b'
                onPress={() => handleDelete()} 
            />           
        </View>
    )
}

export default ConfirmDelete

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f6ea',
      },
  });
   