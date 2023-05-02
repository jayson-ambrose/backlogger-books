import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { activeAccountAtom  } from './lib/atoms';
import {useRecoilValue} from 'recoil'
import {Picker} from '@react-native-picker/picker'
import BacklogDisplay from './BacklogDisplay';

function Backlog({navigation}) {

    const activeAccount = useRecoilValue(activeAccountAtom)
    const [backlogList, setBacklogList] = useState(activeAccount.backlogs)

    useEffect(() => {
        setBacklogList(activeAccount.backlogs)
    }, [])
        
    const [filter, setFilter] = useState('')
    const [backlogFilter, setBacklogFilter] = useState('no-filter')

    const backlogDisplay = (
        <BacklogDisplay 
            backlogList={backlogList} 
            navigation={navigation}/>)
    
    return(
      <View style={styles.container}>
        <View style={styles.containertwo}>
            <Picker
              style={styles.picker}
              selectedValue={backlogFilter} 
              label={backlogFilter}
              onValueChange={(itemValue, itemIndex) => setBacklogFilter(itemValue)}
              enabled={true}>        
                          
              <Picker.Item label='No Filter' value='no-filter' />
              <Picker.Item label='Completed' value='completed' />
              <Picker.Item label='Not Completed' value='not-completed' />
              <Picker.Item label='Reviewed' value='reviewed' />
            </Picker>

            <Text>Enter {backlogFilter} to search: </Text>
            <TextInput
              style={styles.textfield} 
              placeholder={'enter query'} 
              onChangeText={(value) => setFilter(value)}
              value={filter}
            />
            {backlogList.length > 0 ? backlogDisplay : null}                
          </View>
        </View>)}  

export default Backlog

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