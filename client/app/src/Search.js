import React, {useState} from 'react'

// import native components here
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import SearchDisplay from './SearchDisplay'

function Search() {

    const [text, setText] = useState('')
    const [searchBy, setSearchBy] = useState('title')
    const [bookList, setBookList] = useState([])
    
    const handleSearch = () => {

        console.log(text)

        fetch(`https://openlibrary.org/search.json?title=${text}&limit=30`)
        .then(resp => resp.json())
        .then(data => {

            console.log(data.docs.length)

            const books = []

            data.docs.forEach((item) => {
                console.log(item.isbn?.length)                
                if (item.title != undefined && item.isbn?.length != undefined && item.author_name?.length != undefined) {

                    book_object = {
                        title: item?.title,
                        isbn: item?.isbn[0],
                        author: item?.author_name[0]
                    }
                    books.push(book_object)                
                }
            })
            setBookList(books)
        })
        .catch(error => {console.log(error)})
    }

    return(
        <View style={styles.container}>
            <Text></Text>
            <Text></Text>
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
            <SearchDisplay bookList={bookList}/>
        </View>
    )
}   

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38434D',
      alignItems: 'center',
      backgroundColor: ''
    },
    textinput: {
        
    }
  });

  // img src="https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" example cover image url trailing S M or L for small medium or large
   