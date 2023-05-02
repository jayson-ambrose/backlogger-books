import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useRecoilValue} from 'recoil'
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
        fetch(`http://127.0.0.1:5055/books/${reviewBook.id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(reviewPayload)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return(
        <View style={styles.container}>
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
                style={styles.reviewfield}
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    reviewfield: {
      backgroundColor: '#fff',
      borderColor: "#000000",
      borderWidth: 2,
      width:300,
      paddingLeft: 10,
      paddingRight: 10,
    },
    picker: {
        width: 200,
        height: 20,
        backgroundColor: '#ccc'
    },
    ratingline: {
        flexDirection: 'row',
    },
    ratingText: {
        fontSize: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
   