import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

function Search({navigation}) {

    const [text, setText] = useState('')

    function handleSearch () {
        console.log(text)
    }

    function handleChange(e) {
        setText(e.target.value)
    }

    return(
        <View style={styles.container}>
            <Text>Enter title to search: </Text>
            <TextInput 
                placeholder={'enter query'} 
                onSubmitEditing={handleSearch}
                onChange={handleChange}
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
   