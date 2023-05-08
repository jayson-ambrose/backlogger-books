import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import { activeAccountAtom  } from './lib/atoms';
import {useRecoilValue} from 'recoil'
import {Picker} from '@react-native-picker/picker'
import BacklogDisplay from './BacklogDisplay';
import CustomTextInput from './CustomTextInput';

function Backlog({navigation}) {

    const activeAccount = useRecoilValue(activeAccountAtom)

    const [backlogList, setBacklogList] = useState([])
    const [backlogFilter, setBacklogFilter] = useState('no-filter')
    const [titleFilter, setTitleFilter] = useState('')

    function handleChangeTitleFilter (value) {
      setTitleFilter(value)
    }

    useEffect(() => {
      fetch(`http://127.0.0.1:5055/users/${activeAccount.id}/backlogs`)
      .then(resp => resp.json())
      .then(data => {
        setBacklogList(data)
      })
    }, [])

    function handleUpdateBacklog (val, obj) {      
      setBacklogList(backlogList => {
        const newList = [...backlogList]
        const index = newList.findIndex(item => item.id === val)
        newList[index] = obj
        return newList
      })
    }

    function filterFunction(backlog) {
      if (backlogFilter === 'no-filter') {
        return true
      }
      if (backlogFilter === 'completed') {
        return backlog.completed === true ? true : false
      }
      if (backlogFilter === 'not-completed') {
        return backlog.completed === false ? true : false
      }
    }
    
    const displayBacklogs = backlogList.filter(filterFunction)
      .filter((backlog) => backlog.book.title.toLowerCase().includes(titleFilter.toLowerCase()) )
      .map((backlog) => {
      return (
        <BacklogDisplay 
         navigation={navigation} 
         backlog={backlog} 
         key={backlog.id}
         handleUpdateBacklog={handleUpdateBacklog}
        />)
    })   
    
    return(
      <View style={styles.mainContainer}>
        <View style={{width:'90%'}}>
          <Picker            
            selectedValue={backlogFilter} 
            label={backlogFilter}
            onValueChange={(itemValue, itemIndex) => setBacklogFilter(itemValue)}
            enabled={true}>        
                          
            <Picker.Item label='No Filter' value='no-filter' />
            <Picker.Item label='Completed' value='completed' />
            <Picker.Item label='Not Completed' value='not-completed' />
          </Picker>       
          <CustomTextInput
            placeholder={'Filter by title...'} 
            handleChangeText={handleChangeTitleFilter}
            contorlledText={titleFilter}
            highlightColor='#60292e'
          />
        </View>
        <ScrollView style={{width: '90%'}}>
          {displayBacklogs} 
        </ScrollView>  
      </View>)}  

export default Backlog

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f6ea'
  }
    
  });