import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput, AppRegistry, FlatList,Alert } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {
    COLOR_PINK, COLOR_PINK_LIGHT,
    COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
    from './myColors';
import MockData from './MockData'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class Attendance extends Component {
    // constructor(props)
    // {
    //   super(props);
   
    //   this.state = { FlatListItems: [
    //     {key: 'One'},
    //     {key: 'Two'},
    //     {key: 'Three'},
    //     {key: 'Four'},
    //     {key: 'Five'},
    //     {key: 'Six'},
    //     {key: 'Seven'},
    //     {key: 'Eight'},
    //     {key: 'Nine'},
    //     {key: 'Ten'},
    //     {key: 'Eleven'},
    //     {key: 'Twelve'}
    //   ]}
    // }
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          dataSource:[],
          isDialogVisible: false,
         };
       }
       componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        }
    
        showDialog(isShow){
            this.setState({isDialogVisible: isShow});
          }
          sendInput(inputText){
            console.log("sendInput (DialogInput#1): "+inputText);
          }
  FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    }
   
    GetItem (item) {
     
    Alert.alert(item);
   
    }
   
   
    render() {
        
      return (
   
  <View style={styles.MainContainer}>
    
         <FlatList
         
            data={ this.state.dataSource }
            
            ItemSeparatorComponent = {this.FlatListItemSeparator}
   
            renderItem={({item}) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.name)}> {item.name} </Text>}
           />
      
      <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                    hintInput ={"HINT INPUT"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>
  </View>
              
      );
    }
  }
   
  const styles = StyleSheet.create({
   
  MainContainer :{
   
  // Setting up View inside content in Vertically center.
  justifyContent: 'center',
  flex:1,
  margin: 10
   
  },
   
  item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
   
  });