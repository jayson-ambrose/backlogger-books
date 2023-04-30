import React from 'react'
import {useRecoilValue} from 'recoil'
import {activeAccountAtom} from './lib/atoms'
import { Button, StyleSheet, Text, View } from 'react-native';

function AccountDetails({navigation}) {

    const activeAccount = useRecoilValue(activeAccountAtom)
    const numBooksReviewed = activeAccount.reviews.length

    const booksReviewed = activeAccount.reviews.map((book) => {
        return <Text>{book.title}</Text>
    })  

    return(
        <View style={styles.container}>
            <Text>Account Details</Text>
            <Text>{activeAccount.username}</Text>
            <Text>{activeAccount.favorite_book ? activeAccount.favorite_book : "No book selected"}</Text>
            <Text>{activeAccount.favorite_author ? activeAccount.favorite_author : "No author selected"}</Text>
            {booksReviewed}
        </View>
    )
}

export default AccountDetails

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
   