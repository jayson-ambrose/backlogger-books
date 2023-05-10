import React, { useState } from 'react'
import {StyleSheet, Text, Pressable } from 'react-native';

function CustomButton({
    onPress, 
    color='black',
    borderColor=null,
    borderWidth=1, 
    title='Button', 
    width=null,
    height=null,
    marginBottom=1 }) {

    const [buttonColor, setButtonColor] = useState(color)

    function flash () {
        setButtonColor('#60292e')
        setTimeout(() => {
            setButtonColor(color)
            
        }, 50)
    }

    return(
        <Pressable 
        style={[styles.button, {
            backgroundColor: color,
            width: width,
            height: height,
            borderWidth: borderWidth,
            borderColor: borderColor,
            marginBottom: marginBottom}]} 
        onPress={() => {
            
            flash()
            onPress()
            
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