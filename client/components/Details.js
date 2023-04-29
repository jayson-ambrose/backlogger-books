import React from 'react'
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';

function Details({route, navigation}) {

    console.log(route["params"])

    return(
        <View>
            <Text>{route.params.isbn} {route.params.title} {route.params.author}</Text>
        </View>
    )

}

export default Details