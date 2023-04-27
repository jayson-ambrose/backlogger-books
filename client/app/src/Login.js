import React from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router'

function Login({navigation}) {

    function doTheThing() {
        console.log('Tacos')
      }

    return(
        <View style={styles.container}>
            <TextInput style={styles.textfield} placeholder={'Enter Username...'}/>
            <TextInput secureTextEntry={true} style={styles.textfield} placeholder={'Enter Password...'}/>
            <Button title={'Login'} onPress={doTheThing}/>
            <Link href={'/'} style={{color: 'blue'}}>Create Account</Link>
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
   