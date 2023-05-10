import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useRecoilValue, useRecoilState} from 'recoil'
import { activeAccountAtom, bookAtom } from './lib/atoms';

function WriteReview({ navigation }) {

    const [textField, setTextField] = useState('')
    const [rating, setRating] = useState(5)

    const reviewBook = useRecoilValue(bookAtom)
    const activeAccount= useRecoilValue(activeAccountAtom)

    reviewPayload = {
        user_id: activeAccount.id,
        text: textField,
        rating: rating,
    }

    function handleSubmitReview() {
        if (reviewPayload.text.length === 0 || reviewPayload.text === false){
            Alert.alert('Must enter some review text.')
            return
        }
        fetch(`http://127.0.0.1:5055/books/${reviewBook.id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(reviewPayload)
        })
        .then(resp => {
            console.log(resp.status)
            if (resp.ok){
                resp.json().then(data => {
                    Alert.alert('Review posted')
                    navigation.navigate('Details', {isbn: reviewBook.isbn, title: reviewBook.title, author: reviewBook.author})
                })}
            else if (resp.status == '401') {
                Alert.alert('Review failed.', 'You have likely already reviewed this book.')
            } 
            else {
                Alert.alert('Review failed.', 'It is possible your user account has been suspended or deleted')
            }       
        })
    }

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.title}>{reviewBook.title}</Text>
            <Text>{reviewBook.author}</Text>
            <Text>{reviewBook.isbn}</Text>
            <Text></Text>
            <Text>Write Review ({textField.length}/250)</Text>
            <TextInput 
                editable 
                multiline 
                numberOfLines={6}
                maxLength={250}
                style={styles.reviewField}
                value={textField}
                onChangeText={(value) => setTextField(value)} 
            />
            <View style={styles.ratingline}>
                <Text style={styles.ratingText}>Rating: </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={rating} 
                    label={rating}
                    onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
                    enabled={true}
                >
                    <Picker.Item label='10' value={10} />
                    <Picker.Item label='9' value={9} />
                    <Picker.Item label='8' value={8} />
                    <Picker.Item label='7' value={7} />
                    <Picker.Item label='6' value={6} />
                    <Picker.Item label='5' value={5} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='1' value={1} />
                </Picker>
            </View>
            <Text></Text>
            <Button 
            title='Post Review'
            onPress={handleSubmitReview} />
        </View>
    )
}

export default WriteReview

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f6ea',
      },
    reviewField: {
      backgroundColor: '#fff',
      borderColor: "#000000",
      borderWidth: 1,
      width:300,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 4
    },
    picker: {
        width: 100,
        height: 20,
        backgroundColor: '#f8f6ea',
        color: '#60292e'
    },
    ratingline: {
        flexDirection: 'row',
    },
    ratingText: {
        fontSize: 20,
        marginTop: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
   