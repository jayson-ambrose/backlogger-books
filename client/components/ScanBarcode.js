import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'

function ScanBarcode({navigation}) {

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [bookObject, setBookObject] = useState(null)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');        
        }
        getBarCodeScannerPermissions()
        
    }, [])

    const handleBarCodeScanned = (barcode) => {
        const {type, data} = barcode;
        () => setScanned(true);
        console.log(`barcode type: ${type} \n barcode data: ${data}`)

        if (scanned === true){
        
            fetch(`https://openlibrary.org/search.json?isbn=${data}&limit=1`)
            .then(resp => resp.json())
            .then(bookInfo => {

                const item = bookInfo.docs[0]

                setBookObject({
                        title: item?.title,
                        isbn: item?.isbn[0],
                        author: item?.author_name[0]
                    }) 
                    
                console.log(bookObject)

                navigation.navigate('Details', bookObject)

                setTimeout(() => {setBookObject(null), 200})
                })

    }}

    if (hasPermission == null) {
        return <Text>Requesting for camera permissions...</Text>
    }
    if (hasPermission == false) {
        return <Text>No access to camera!</Text>
    }

    return(
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined: handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}

export default ScanBarcode

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

//   AIzaSyCXmKKdo67Z08D9QsC7w2UH4lcuoqqr1Yw api key do not push
   