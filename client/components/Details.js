import React from 'react'
import { Button, StyleSheet, Text, View, Image, Alert} from 'react-native';
import { useRecoilState } from 'recoil'
import { activeAccountAtom } from './lib/atoms';

function Details({route, navigation}) {

    const {isbn, title, author} = route.params

    const[activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)

    function processBacklog() {

        const payload = {
            isbn: isbn,
            title: title,
            author: author,
            user_id: activeAccount.id
        }

        fetch('http://127.0.0.1:5055/books', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    function promptLogin () {
        Alert.alert('Go to log-in screen?', 'Must be logged in to add to your backlog.', [
            {
                text: 'Login',
                onPress: () => navigation.navigate('LandingScreen')
            },
            {
                text: 'Cancel'
            }
        ])
    }

    let backlogButton = (
        <Button title="Backlog Book" color={'#adc6ec'} onPress={() => promptLogin()}/>)

    if (activeAccount != null) {
        backlogButton = (
            <Button title="Backlog Book" onPress={() => processBacklog()}/>)}

    return(
      <View style={styles.container}>
        <Image 
            source={{uri: `https://covers.openlibrary.org/b/isbn/${route.params.isbn}-L.jpg`}}
            style={styles.cover}
        />
        <Text style={styles.title}>{title}</Text>
        <Text>{author}</Text>
        <Text>{isbn}</Text>
        {backlogButton}
         
        <Button title="Read Reviews"/>
        
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
        height: 340,
        width: 220
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });