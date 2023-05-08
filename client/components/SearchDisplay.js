import React from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from './CustomButton';

function SearchDisplay({ book, navigation }) {

    const {title, author, isbn} = book    

    return(
        <View key={isbn} style={styles.mainContainer}>
            <View style={styles.resultContainer}>
                <Image 
                    source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}}
                    style={styles.cover}
                />
                <View>
                    <Text>{title}</Text>
                    <Text>{author}</Text>
                    <Text>{isbn} </Text>
                </View>
            </View> 
            <View style={styles.buttonContainer}>           
                <CustomButton 
                    title={'See Details'}
                    onPress={() => navigation.navigate('Details', {isbn: isbn, title: title, author: author})}
                    color={'#377ba4'}
                    height={50}
                />
            </View>
        </View>
    )
}

export default SearchDisplay

const styles = StyleSheet.create({
    cover: {
        height: 95,
        width: 60
    },
    mainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#60292e',
    },
    resultContainer: {
        margin:10,
        flexDirection: 'row',
        
    },
    buttonContainer : {
        flexDirection:'row',
        justifyContent: 'flex-end',
        paddingBottom: 10
    }
  });
   