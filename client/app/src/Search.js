import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

function Search({navigation}) {

    const [text, setText] = useState('')

    function handleSearch () {
        console.log(text)
    }

    return(
        <View style={styles.container}>
            <Text>Enter title to search: </Text>
            <TextInput 
                placeholder={'enter query'} 
                onSubmitEditing={handleSearch}
                onChangeText={(value) => setText(value)}
                value={text}
            />
            <Button 
                title={'Search'} 
                type={'submit'}
                onPress={handleSearch}
            />
        </View>
    )
}   

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38434D',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ''
    },
    textinput: {
        
    }
  });
   