import React from 'react'

// import native components here
import { Button, StyleSheet, Text, View, ScrollView, Image } from 'react-native';

function SearchDisplay({ bookList, navigation }) {

    const displayBooks = bookList.map((book) => {
        const {title, author, isbn} = book
        return (
            <View key={isbn}>
                <Text style={styles.title}>{title}</Text>
                <Text>{author}</Text>
                <Text>{isbn} </Text>
                <Text> </Text>
                <Image 
                    source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`}}
                    style={styles.cover}
                />
                <Button 
                    title={'See Details'}
                    onPress={() => navigation.navigate('Details', {isbn: isbn, title: title, author: author})}
                />
                <Text/>
            </View>
        )
    })

    return(
        <ScrollView>
            {displayBooks}
        </ScrollView>
    )
}

export default SearchDisplay

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover: {
        height: 80,
        width: 55
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
   