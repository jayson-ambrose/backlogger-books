import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native';

function CustomTextInput({
    highlightColor='grey',
    placeholder,
    controlledText,
    handleChangeText,
    submitEditing=null,
    secure}) {

    const [focused, setFocused] = useState(false)

    handleFocus = () => {setFocused(true)}
    handleBlur = () => {setFocused(false)}

    return(
        <TextInput
            style={focused ? [styles.textInput,
                 {borderColor: highlightColor, color: highlightColor, borderWidth: 2}] :
                [styles.textInput, {borderColor: 'grey'}]}
            placeholder={placeholder}
            value={controlledText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(value) => handleChangeText(value)}
            secureTextEntry={secure}
            cursorColor={highlightColor}
            onSubmitEditing={submitEditing}
        />
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 5,
        paddingLeft:15,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white'
    }    
});