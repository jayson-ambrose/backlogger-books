import React from 'react'
import {useRecoilValue} from 'recoil'
import {activeAccountAtom} from './lib/atoms'
import { Button, StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

function AccountDetails({navigation}) {

    const activeAccount = useRecoilValue(activeAccountAtom)


    const numBooksReviewed = activeAccount.reviews.length

    const booksReviewed = activeAccount.reviews.map((review) => {
        
        const {title, id} = review.book
        
        return (
                <Text key={id}>{title}</Text>
        )})  

    return(
        <View style={styles.mainContainer}>
            <Text>{activeAccount.username}</Text>
            <Text>
                {activeAccount.favorite_title ? 
                    `Favorite Title: ${activeAccount.favorite_title}` :
                    "No favorite book selected"}
             </Text>
            <Text>
                {activeAccount.favorite_author ? 
                    `Favorite Author: ${activeAccount.favorite_author}` :
                    "No favorite author selected"}
            </Text>
            <View>
                <CustomButton 
                    title='Change Password'
                    onPress={() => navigation.navigate('ChangePassword')}
                    color={'#377ba4'}/>
                <CustomButton 
                    color='#c9272b' 
                    title='Delete Account'
                    onPress={() => navigation.navigate('ConfirmDelete')}/>
            </View>
            <Text>Books Reviewed({numBooksReviewed}):</Text>
            {booksReviewed}
        </View>)}

export default AccountDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f6ea',
      },
  });
   