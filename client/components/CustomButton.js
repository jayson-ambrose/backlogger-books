import React, { useState } from 'react'
import {StyleSheet, Text, Pressable } from 'react-native';

function CustomButton({
    onPress, 
    color='black', 
    title='Button', 
    width=null,
    height=null }) {

    const [buttonColor, setButtonColor] = useState(color)

    function flash () {
        setButtonColor('#a4a4a4')
        setTimeout(() => {
            setButtonColor(color)
        }, 50)
    }

    return(
        <Pressable 
        style={[styles.button, {
            backgroundColor: color,
            width: width,
            height: height}]} 
        onPress={() => {
            onPress()
            flash()
        }}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      elevation: 3,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });