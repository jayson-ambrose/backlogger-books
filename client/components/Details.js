import React, {useEffect, useState} from 'react'
import { Button, StyleSheet, Text, View, Image, Alert} from 'react-native';
import { useRecoilState } from 'recoil'
import { activeAccountAtom, bookAtom } from './lib/atoms';

function Details({route, navigation}) {

    const {isbn, title, author} = route.params

    const[activeAccount, setActiveAccount] = useRecoilState(activeAccountAtom)
    const[book, setBook] = useRecoilState(bookAtom)

    const payload = {
        isbn: isbn,
        title: title,
        author: author}   

    useEffect(() => {
        fetch('http://127.0.0.1:5055/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => setBook(data))
            }
            else {
                console.log(resp.json())
            }})        
    },[])

    function processBacklog() {

        fetch('http://127.0.0.1:5055/backlogs', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(data => {
                    setActiveAccount({
                        ...activeAccount, backlogs: [
                            ...activeAccount.backlogs, data]
                        })

                    Alert.alert('Your book has been added!', 'View your backlog now?', [
                        {text: 'Backlog', onPress: () => navigation.navigate('Backlog')},
                        {text: 'Stay'}
                    ])
                })
            } else {
               Alert.alert('Error', 'This book is already in your backlog. View backlog now?', [
                    {text: 'Backlog', onPress: () => navigation.navigate('Backlog')},
                    {text: 'Stay'}
               ])}})}

    function processSetFavAuthor() {

        const author_payload = {
            type: 'change_fav_author',
            author: book.author
        }

        fetch(`http://127.0.0.1:5055/users/${activeAccount.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(author_payload)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(data => {
                    console.log(data.favorite_author)
                    setActiveAccount({...activeAccount, favorite_author: data.favorite_author})
                    Alert.alert('Favorite author set')
                })
            }
        })
    }

    function processSetFavTitle() {

        const title_payload = {
            type: 'change_fav_title',
            title: book.title
        }

        fetch(`http://127.0.0.1:5055/users/${activeAccount.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(title_payload)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(data => {
                    console.log(data.favorite_title)
                    setActiveAccount({...activeAccount, favorite_title: data.favorite_title})
                    Alert.alert('Favorite title set')
                })
            }
        })
    }

    function promptLogin () {
        Alert.alert('Go to log-in screen?', 'Must be logged in to add to your backlog.', [
            {text: 'Login', onPress: () => navigation.navigate('LandingScreen')},
            {text: 'Cancel'}])}

    let backlogButton = (
        <Button title="Backlog Book" color={'#adc6ec'} onPress={() => promptLogin()}/>)
    let favAuthButton = (
        <Button
            title='Set Favorite Author'
            onPress={() => Alert.alert('Log in to set your favorite author.')}/>)
    let favTitleButton = (
        <Button
            title='Set Favorite Title'
            onPress={() => Alert.alert('Log in to set your favorite title.')}/>)

    if (activeAccount != null) {
        backlogButton = (
            <Button title="Backlog Book" onPress={() => processBacklog()}/>)}

        favAuthButton = (
            <Button
                title='Set Favorite Author'
                onPress={() => processSetFavAuthor()}/>)

        favTitleButton = (
            <Button
                title='Set Favorite Title'
                onPress={() => processSetFavTitle()}/>)

    return(
      <View style={styles.container}>
        <Image 
            source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}}
            style={styles.cover}
        />
        <Text style={styles.title}>{title}</Text>
        <Text>{author}</Text>
        <Text>{isbn}</Text>
        {backlogButton}        
        <Button 
            title="Reviews" 
            onPress={() => navigation.navigate('Reviews', {isbn: isbn, title: title, author: author})}
        />
        {favAuthButton}   
        {favTitleButton}    
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