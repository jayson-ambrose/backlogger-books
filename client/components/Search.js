import React, { useState, useRef } from 'react'
import {Picker} from '@react-native-picker/picker'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import SearchDisplay from './SearchDisplay'
import { useRecoilValue } from 'recoil'
import { activeAccountAtom } from './lib/atoms'
import CustomButton from './CustomButton'
import CustomTextInput from './CustomTextInput'


function Search({navigation}) {

    const activeAccount = useRecoilValue(activeAccountAtom)
    
    const [query, setQuery] = useState('')
    const [bookList, setBookList] = useState([])
    const [searchFilter, setSearchFilter] = useState('author')

    function handleChangeQueryText (value) {
        setQuery(value)
    }
    
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

    const displayResults = bookList.map((book) => {

        return (
        <SearchDisplay 
            navigation={navigation}
            book={book}
            key={book.isbn + book.title}
        />
        )})

    return(
        <View style={styles.mainContainer}>
            <View style={{width: "90%"}}>
                <Picker
                    selectedValue={searchFilter} 
                    label={searchFilter}
                    onValueChange={(itemValue, itemIndex) => setSearchFilter(itemValue)}
                    enabled={true}>
                    <Picker.Item label='Title' value='title' />
                    <Picker.Item label='Author' value='author' />
                    <Picker.Item label='ISBN' value='isbn' />
                </Picker>
                <CustomTextInput 
                    placeholder={`Enter ${searchFilter}...`}
                    handleChangeText={handleChangeQueryText}
                    controlledText={query}
                    highlightColor='#60292e'
                    submitEditing={handleSearch}
                />
                <CustomButton 
                    title={'Search'}
                    onPress={handleSearch}
                    style={{margin: 10}} 
                    color={'#377ba4'}/>

            </View>
            <ScrollView style={{width: "90%"}}>
                {/* <SearchDisplay bookList={bookList} navigation={navigation}/> */}
                {displayResults}
            </ScrollView>
            
        </View>
    )
}   

export default Search

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f6ea',
      }
  });

  // img src="https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" example cover image url trailing S M or L for small medium or large
   