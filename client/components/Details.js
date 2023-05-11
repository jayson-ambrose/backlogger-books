import React, {useEffect, useState} from 'react'
import { Button, StyleSheet, Text, View, Image, Alert} from 'react-native';
import { useRecoilState } from 'recoil'
import { activeAccountAtom, bookAtom } from './lib/atoms';
import CustomButton from './CustomButton';

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
                throw error('Error')
            }})        
    },[])

    let avgRating = 0

    if (book) {
        let totalScore = 0
        book.reviews?.forEach((review) => {
            totalScore = totalScore + review.rating
        })
        avgRating = totalScore / book.reviews?.length
    }

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
        <CustomButton 
            title="Backlog Book" 
            color={'#bbb6c7'} 
            onPress={() => promptLogin()}/>)
    let favAuthButton = (
        <CustomButton
            title='Set Favorite Author'
            onPress={() => Alert.alert('Log in to set your favorite author.')}
            color={'#bbb6c7'} 
            />)
    let favTitleButton = (
        <CustomButton
            title='Set Favorite Title'
            onPress={() => Alert.alert('Log in to set your favorite title.')}
            color={'#bbb6c7'} 
            />)

    if (activeAccount != null) {
        backlogButton = (
            <CustomButton 
                title="Backlog Book" 
                onPress={() => processBacklog()}
                color={'#377ba4'}
                />)

        favAuthButton = (
            <CustomButton
                title='Set Favorite Author'
                onPress={() => processSetFavAuthor()}
                color={'#377ba4'}
                />)

        favTitleButton = (
            <CustomButton
                title='Set Favorite Title'
                onPress={() => processSetFavTitle()}
                color={'#377ba4'}
                />)
            }

    return(
      <View style={styles.mainContainer}>
        <Image 
            source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}}
            style={styles.cover}
        />
        <Text>{title}</Text>
        <Text>{author}</Text>
        <Text>{isbn}</Text>
        <Text>{avgRating ? `Average Rating: ${avgRating.toFixed(2)} `: 'Not Yet Rated'}</Text>
        <View style={styles.buttonContainer}>            
            <CustomButton 
                title="Reviews" 
                onPress={() => navigation.navigate('Reviews', {isbn: isbn, title: title, author: author})}
                color={'#377ba4'}
            />
            {backlogButton}  
            {favAuthButton}   
            {favTitleButton}
        </View>      
      </View>
    )
}

export default Details

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f6ea',
      },
    cover: {
        height: 320,
        width: 210
    },
    buttonContainer:{
      flex: 0,
      width: '95%',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginBottom: 5,
      position: 'relative'
    }
  });