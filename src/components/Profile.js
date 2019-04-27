import React,{ Component }from 'react';
import { Button, Image,StyleSheet,TextInput,View, Text, TouchableOpacity,ActivityIndicator,FlatList} from 'react-native';
import { ImagePicker } from 'expo';
import Icon from "react-native-vector-icons/Ionicons";
import {
    COLOR_PINK, COLOR_PINK_LIGHT, 
    COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
  from './myColors';
  import { Avatar }  from 'react-native-elements';

  export default class Profile extends Component {
    static navigationOptions = {
      title: 'Profile',
      
    }
   
    state = {
    
    
      email:'',
      password:'',
      username:'nirojhmg'
      
    }
    changeName(text) {
      this.setstate({username: text}) //How can I immediately set the defaultValue='PassMeIn' to nameNow? Because this method would never be called unless text is changed within TextInput
  }
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://100.121.101.233:8000/users/student/1/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });
console.log(this.state.dataSource);

      })
      .catch((error) =>{
        console.error(error);
      });
  }
render() {
  if(this.state.isLoading){
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    )
  }

    return (
        <View style={styles.container}>
        <View style={styles.up}>
        <Avatar rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  }}
  size="large"
  showEditButton


/>
</View>
<View style={styles.down}>
 <View style={styles.SectionStyle}>

        <Text style={styles.TextStyle}>Branch:</Text>

          <TextInput
              style={{flex:1}}
              placeholder={this.state.dataSource.branch}
              underlineColorAndroid="transparent"
            //value={this.state.dataSource.user}
          />
         

        </View> 
        <TouchableOpacity style={styles.SubmitButton} >
              <Text style={styles.SubmitButtonTitle} >Submit</Text>
            </TouchableOpacity>
        {/* <View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>DOB:</Text>

  <TextInput
      style={{flex:1}}
      placeholder="Enter Your Email Here"
      underlineColorAndroid="transparent"
    value={this.state.dataSource.DOB}
  />

</View> 
<View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>branch:</Text>

  <TextInput
      style={{flex:1}}
      placeholder="Enter Your Email Here"
      underlineColorAndroid="transparent"
    value={this.state.dataSource.branch}
  />

</View> 
<View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>Username:</Text>

  <TextInput
      style={{flex:1}}
      placeholder="Enter Your Email Here"
      underlineColorAndroid="transparent"
    value={this.state.dataSource.branch}
  />

</View>  */}
         {/* <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          
          renderItem={({item}) => <Text>{item.title}</Text>}
          //keyExtractor={({id}, index) => id}
        />
        <FlatList><Text>{this.state.dataSource.title}</Text></FlatList>
      </View> */}
        

</View>          


</View>
    );
  }

  
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: COLOR_PINK_LIGHT
    },
    up: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      down: {
        flex: 7,//70% of column
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5 ,
        margin: 10
    },
    
    TextStyle: {
        flexDirection:'row',
        margin: 0,
        
        resizeMode : 'stretch',
        alignItems: 'center'
        
    },
    ImageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode : 'stretch',
      alignItems: 'center'
  },
  SubmitButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  SubmitButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
    })