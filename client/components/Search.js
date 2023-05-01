import React, { useState, useRef } from 'react'
import {Picker} from '@react-native-picker/picker'
import { Button, StyleSheet, Text, View, TextInput, SectionList } from 'react-native'
import SearchDisplay from './SearchDisplay'
import { useRecoilValue } from 'recoil'
import { activeAccountAtom } from './lib/atoms'


function Search({navigation}) {

    const activeAccount = useRecoilValue(activeAccountAtom)
    
    const [query, setQuery] = useState('')
    const [bookList, setBookList] = useState([])
    const [searchFilter, setSearchFilter] = useState('author')
    
    const handleSearch = () => {

        console.log(query)

        fetch(`https://openlibrary.org/search.json?${searchFilter}=${query}&limit=30`)
        .then(resp => resp.json())
        .then(data => {

            const books = []
            data.docs.forEach((item) => {

                if (item.title != undefined && item.isbn?.length != undefined && item.author_name?.length != undefined) {

                    const book_object = {
                        title: item?.title,
                        isbn: item?.isbn[0],
                        author: item?.author_name[0]
                    }

                    books.push(book_object)                
                }
            })
            setBookList(books)
            setQuery('')
        })
        .catch(error => {console.log(error)})
    }

    return(
        <View style={styles.container}>
            <View style={styles.containertwo}>
                <Picker
                    style={styles.picker}
                    selectedValue={searchFilter} 
                    label={searchFilter}
                    onValueChange={(itemValue, itemIndex) => setSearchFilter(itemValue)}
                    enabled={true}
                >
                    <Picker.Item label='Title' value='title' />
                    <Picker.Item label='Author' value='author' />
                    <Picker.Item label='ISBN' value='isbn' />
                </Picker>

                <Text>Enter {searchFilter} to search: </Text>
                <TextInput
                    style={styles.textfield} 
                    placeholder={'enter query'} 
                    onSubmitEditing={handleSearch}
                    onChangeText={(value) => setQuery(value)}
                    value={query}
                />
                <Button 
                    title={'Search'} 
                    type={'submit'}
                    onPress={handleSearch}
                />
            </View>
            <SearchDisplay bookList={bookList} navigation={navigation}/>
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
    picker: {
        alignItems: 'center',
        borderWidth: 2,
        width: 300,
        backgroundColor: '#ccc'
    },
    textfield: {
        backgroundColor: '#fff',
        width: 300,
        borderWidth: 2,
        paddingLeft: 10,
        marginBottom: 5
      },
    containertwo: {
      backgroundColor: '#73b4ca',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth:2
      }
  });

  // img src="https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" example cover image url trailing S M or L for small medium or large
   