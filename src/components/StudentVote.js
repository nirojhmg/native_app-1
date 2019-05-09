import { StyleSheet,Dimensions,FlatList,StatusBar,TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage,TouchableHighlight,Picker } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';

import PieChart from 'react-native-pie-chart';
import React, {Animated, Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-popup-dialog';
  import { CardViewWithIcon } from "react-native-simple-card-view";
  
export default class StudentVote extends Component {
    static navigationOptions = {
        title: 'Vote',
    
      }
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          data:[],
          isDialogVisible: false,
          drop_down_data:[],
          defaultAnimationDialog: false,
          elements:[],
         };
         
       }
       showDialog(isShow){
        this.setState({isDialogVisible: isShow});
      }
     
      SubmitFunction = () => {


              
        
          

      console.log("PickerHolder:"+this.state.PickerValueHolder+"User:"+this.state.user+"Key:"+this.state.key)    
        fetch('http://100.121.101.233:8000/users/foty/', {
        method: 'POST',
   
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           // Authorization:  `7419b3f8649566eeee73097184dd4541920af853`,
           Authorization: `Token `+this.state.key,
   
         },
        body:
               JSON.stringify({
                
       "student": this.state.user,
       "student_name": this.state.username,
       "faculty_name": this.state.PickerValueHolder
       
               })
   
   
   
   
       }).then((response) => response.json())
         .then((responseJson) => {
            this.props.navigation.navigate("Vote")
            this.setState({ defaultAnimationDialog: false });
           Alert.alert(JSON.stringify(responseJson));
   
         });
   
         
   
     }
      
      
       componentDidMount(){
       
        fetch('http://100.121.101.233:8000/users/foty/')
        .then((response) => response.json())
        .then(data => {
           

            
      this.setState({ data: data,count:Object.keys(data).length})
     
    })
        .catch((error) => {
          console.error(error);
        })
         fetch('http://100.121.101.233:8000/users/users/')
        .then((response) => response.json())
        .then(data => {
           

            
      this.setState({ drop_down_data: data.filter(d => d.is_teacher === true),PickerValueHolder:data.filter(d => d.is_teacher === true)[0].username})
      console.log("drop:"+this.state.drop_down_data)
    })
        .catch((error) => {
          console.error(error);
        })  
       
       
        AsyncStorage.getItem('user').then((user) => {
  
            this.setState({
            user:user 
            
            })
            
            console.log("User:"+this.state.user)
           
          })
          AsyncStorage.getItem('key').then((key) => {
  
            this.setState({
            key:key 
            
            })
            
            console.log("key:"+this.state.key)
           
          })
          AsyncStorage.getItem('username').then((username) => {
  
            this.setState({
            username:username 
            
            })
            
            console.log("Username:"+this.state.username)
           
          })
         
          
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
      
      addButton=()=>{
       
        this.setState({ defaultAnimationDialog: true});
      }
    render() {
      const miniCardStyle = {shadowColor       : '#000000',shadowOffsetWidth : 2,shadowOffsetHeight: 2,shadowOpacity     : 0.1,hadowRadius      : 5,bgColor           : '#ffffff',padding           : 5,margin            : 5,borderRadius      : 3,elevation         : 3,width             : (Dimensions.get("window").width / 2) - 10
    };
        const uniqueTags = [];

        
this.state.data.map(img => {
    if (uniqueTags.indexOf(img.faculty_name) === -1) {
        uniqueTags.push(img.faculty_name)
    }
});


   
var elements=[];
    for(var i=0;i<uniqueTags.length;i++){
        var count = Object.keys(this.state.data.filter(d => d.faculty_name === uniqueTags[i])).length;
     elements.push({"name":uniqueTags[i],"count":count});
     
    }
    console.log(elements)
    return(
        <View style={styles.MainContainer}>
         
         <View style={ {alignItems   : "center",flexDirection: "row",flexWrap     : 'wrap',} }>
        { elements.map((item, key)=>(
         
         <CardViewWithIcon
         key={key}
            withBackground={ false }
            // androidIcon={ 'logo-github' }
            // iosIcon={ 'logo-github' }
            iconHeight={ 30 }
            iconColor={ '#333' }
            title={ item.name  }
            contentFontSize={ 20 }
            titleFontSize={ 12 }
            style={ miniCardStyle }
            content={ item.count.toString() }
            // onPress={ () => this.setState({
            //          github       : this.state.github + 1
            // }) }
          />
         )
         )}    
          
  
         
        </View>
      <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title={"Select Faculty of Year "}
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />
              <DialogButton
                text="OK"
                bordered
                onPress={
                    this.SubmitFunction
                   
                  }
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
            
           
 <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            { this.state.drop_down_data.map((item, key)=>(
            <Picker.Item label={item.username} value={item.username} key={key} />)
            )}

          </Picker>
          </DialogContent>
        </Dialog>

        <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={this.addButton}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                    </View>
    );
    }
}
const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
       // justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: COLOR_PINK_LIGHT
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        margin: 10
      }
});