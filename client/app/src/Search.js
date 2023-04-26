import React from 'react'

// import native components here
import { Button, StyleSheet, Text, View } from 'react-native';

function Search({navigation}) {

    return(
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
   