import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';

function CreateAccount() {

    const router = useRouter()
    const {handleLogin} = useSearchParams()

    console.log(handleLogin)

    const [userText, setUserText] = useState('')
    const [passText, setPassText] = useState('')
    const [rePassText, setRePassText] = useState('')  
    
    
    
    function handleSubmit(user, pass, rePass) {

        const credentials = {
            username: user,
            password: pass,
            re_password: rePass
        }

        fetch('http://127.0.0.1:5055/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(resp => {
            if(resp.ok){
                resp.json().then(data => {
                  console.log(data)
                  
                })
            }
        })
    }
    
    return(
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.containertwo}>
                <TextInput 
                    style={styles.textfield}
                    placeholder={'Enter Username...'}
                    value={userText}
                    onChangeText={(value) => setUserText(value)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    style={styles.textfield} 
                    placeholder={'Enter Password...'}
                    value={passText}
                    onChangeText={(value) => setPassText(value)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    style={styles.textfield} 
                    placeholder={'Re-enter Password...'}
                    value={rePassText}
                    onChangeText={(value) => setRePassText(value)}
                />
                <Button 
                    title={'Create Account'} 
                    onPress={() => handleSubmit(userText, passText, rePassText)}
                />
            </View>
          </View>
        </View>
    )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 24,
      backgroundColor: '#2c666f',
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    title: {
      fontSize: 38,
      fontWeight: "bold",
      color: '#fff'
    },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
    textfield: {
        backgroundColor: '#fff',
        width: 300,
        borderWidth: 2,
        paddingLeft: 10,
        marginBottom: 5
      },
    containertwo: {
      flex: 1,
      backgroundColor: '#73b4ca',
      alignItems: 'center',
      justifyContent: 'center',
    }      
  });
   