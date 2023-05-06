import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Alert } from 'react-native';
import { useRecoilValue} from 'recoil'
import { bookAtom, loggedInAtom } from './lib/atoms';

function Reviews({ navigation }) {

    const reviewBook = useRecoilValue(bookAtom)
    const loggedIn = useRecoilValue(loggedInAtom)

    const [reviewsList, setReviewsList] = useState([])

    const {title, author, isbn, id} = reviewBook

    useEffect(() => {
        fetch(`http://127.0.0.1:5055/books/${id}/reviews`)
        .then(resp => {
            if(resp.ok){
                resp.json().then(data => setReviewsList(data))
            }})            
        .catch(error => console.log(error.message))
    }, [])

    const displayReviews = reviewsList.map((review) => {
        return (
            <View key={review.id}>
                <Text>{review.user.username}</Text>
                <Text>{review.review_text}</Text>
                <Text>{review.rating}/10</Text>                
            </View>
        )})

    let reviewBookButton =(
        <Button 
            color={'#adc6ec'} 
            title='Write Review' 
            onPress={() => promptLogin() } />)

    if(loggedIn) {
        reviewBookButton = (
            <Button 
                title='Write Review'
                onPress={() => navigation.navigate('WriteReview')}/>)}

    function promptLogin () {
        Alert.alert('Go to log-in screen?', 'Must be logged in to write reviews.', [
            {text: 'Login', onPress: () => navigation.navigate('LandingScreen')},
            {text: 'Cancel'}
        ])}

    return(
        <View>
            <Text >{title}</Text>
            <Text>{author}</Text>
            <Text>{isbn}</Text>
            {reviewBookButton}
            <ScrollView>
                {displayReviews}
            </ScrollView>
        </View>)
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
        fontWeight: 'bold',
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
    }
  });
   