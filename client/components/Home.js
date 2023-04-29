import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

function Home({navigation}) {

    return(
        <View style={styles.container}>
            <Text>Home</Text>
            <Button 
                title='got to test'
                onPress={() => {
                    navigation.navigate('Test', {})
                }}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
   