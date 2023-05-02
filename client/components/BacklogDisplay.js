import React from 'react'

// import native components here
import { Button, StyleSheet, Text, View, ScrollView, Image } from 'react-native';

function BacklogDisplay({ backlogList, navigation }) {

    const displayBacklogs = backlogList.map((backlog) => {

        const {title, author, isbn, id, completed} = backlog.book

        return (
          <View key={isbn}>
            <Text style={styles.title}>{title}</Text>
            <Text>{author}</Text>
            <Text>{isbn} </Text>
            <Text> </Text>
            <Image 
                source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}}
                style={styles.cover}
            />
            <Button 
              title={'See Details'}
              onPress={() => navigation.navigate('Details', {isbn: isbn, title: title, author: author, id: id})}
            />
            <Text/>
          </View>
        )
    })

    return(
      <ScrollView>
        {displayBacklogs}
      </ScrollView>
    )
}

export default BacklogDisplay

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover: {
        height: 85,
        width: 55
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
   