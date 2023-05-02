import React from 'react'
import { Button, StyleSheet, Text, View, Alert } from 'react-native';

function ConfirmDelete({navigation}) {

    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Are you sure you want to delete your account? 
                This action cannot be undone. All of your 
                reviews and backlogged books will also be
                deleted.
            </Text>
            <Button 
                title="Delete Account"
                color='#d64d3e' 
            />           
        </View>
    )
}

export default ConfirmDelete

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        paddingRight: 20,
        paddingLeft: 20
    }
  });
   