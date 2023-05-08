import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Alert } from 'react-native';
import { useRecoilValue} from 'recoil'
import { bookAtom, loggedInAtom } from './lib/atoms';
import CustomButton from './CustomButton';

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
            <View key={review.id} style={{alignContent: 'center'}}>
                <Text style={styles.title}>{review.user.username}</Text>
                <Text>{review.review_text}</Text>
                <Text>{review.rating}/10</Text>                
            </View>
        )})

    let reviewBookButton =(
        <CustomButton 
            color={'#bbb6c7'} 
            title='Write Review' 
            onPress={() => promptLogin() } />)

    if(loggedIn) {
        reviewBookButton = (
            <CustomButton 
                title='Write Review'
                onPress={() => navigation.navigate('WriteReview')}
                color={'#377ba4'}/>)}

    function promptLogin () {
        Alert.alert('Go to log-in screen?', 'Must be logged in to write reviews.', [
            {text: 'Login', onPress: () => navigation.navigate('LandingScreen')},
            {text: 'Cancel'}
        ])}

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{author}</Text>
            <Text>{isbn}</Text>
            {reviewBookButton}
            <ScrollView style={{width: '90%'}}>
                {displayReviews}
            </ScrollView>
        </View>)
}

export default Reviews

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f6ea',
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
  });
   