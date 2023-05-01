import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

function Reviews({navigation, route}) {

    const {isbn, title, author} = route.params

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text>{author}</Text>
            <Text>{isbn}</Text>
        </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
   