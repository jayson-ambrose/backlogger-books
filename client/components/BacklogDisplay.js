import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, ScrollView, Image, Switch } from 'react-native';

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
      <View key={isbn}>
        <Text>{title}</Text>
        <Text>{author}</Text>
        <Text>{isbn} </Text>
        <View>
          <Image 
              source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}}
              style={styles.cover}
          />
          <Text>  Completed?</Text>
          <Switch 
            onValueChange={(value) => {handleChangeToggle(value)}}
            value={switchValue}
          />
        </View>
        <Button 
          title={'See Details'}
          onPress={() => navigation.navigate('Details', {isbn: isbn, title: title, author: author, id: id})}
        />
        <Text/>
      </View>
    )}

export default BacklogDisplay

const styles = StyleSheet.create({    
    cover: {
        height: 85,
        width: 55
    }
  });
   