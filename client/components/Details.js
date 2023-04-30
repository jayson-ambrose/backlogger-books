import React from 'react'
import { Button, StyleSheet, Text, View, TextInput, Image} from 'react-native';

function Details({route, navigation}) {

    const {isbn, title, author} = route.params

    return(
        <View style={styles.container}>
          <Image 
              source={{uri: `https://covers.openlibrary.org/b/isbn/${route.params.isbn}-M.jpg`}}
              style={styles.cover}
          />
          <Text>{title}</Text>
          <Text>{author}</Text>
          <Text>{isbn}</Text>
          
          <Button title="Read Reviews"/>
          <Button title="Backlog Book"/>
        </View>
    )

}

export default Details

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover: {
        height: 160,
        width: 110
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });