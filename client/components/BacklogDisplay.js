import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, ScrollView, Image, Switch } from 'react-native';
import CustomButton from './CustomButton';

function BacklogDisplay({ backlog, navigation, handleUpdateBacklog }) {

  const {title, author, isbn, id} = backlog.book    
  const [switchValue, setSwitchValue] = useState(backlog.completed)

  function handleChangeToggle(value) {
    setSwitchValue(value)
    updateCompleted(value)
  }

  function updateCompleted(value) {

    fetch(`http://127.0.0.1:5055/backlogs/${backlog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(resp => {
      if(resp.ok) {
        resp.json().then(data => handleUpdateBacklog(data.id, data))
      }
    })
   }

    return (
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
          <Switch 
            onValueChange={(value) => {handleChangeToggle(value)}}
            value={switchValue}
          />
        </View> 
        <View style={styles.buttonContainer}>
          <CustomButton 
            title={'See Details'}
            onPress={() => navigation.navigate('Details', {isbn: isbn, title: title, author: author, id: id})}
            color='#377ba4'
          />
        </View> 
      </View>
    )}

export default BacklogDisplay

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
        justifyContent: 'space-between'
        
    },
    buttonContainer : {
        flexDirection:'row',
        justifyContent: 'flex-end',
        paddingBottom: 10
    }
  });
   