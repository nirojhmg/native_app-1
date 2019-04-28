import React, { Component } from 'react';
import { Button, Image, StyleSheet, TextInput, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert, Picker } from 'react-native';
import { ImagePicker } from 'expo';
import Icon from "react-native-vector-icons/Ionicons";
import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
  from './myColors';
import { Avatar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',

  }


  state = {


    email: '',
    password: '',
    username: 'nirojhmg'

  }
  changeName(text) {
    this.setstate({ username: text }) //How can I immediately set the defaultValue='PassMeIn' to nameNow? Because this method would never be called unless text is changed within TextInput
  }
  ProfileSubmitFunction = () => {


    console.log('Pressed')
    fetch('http://100.121.101.233:8000/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "nirojhmg",


        password: "nirojhmg"


      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.saveItem('key', responseData.key),
          console.log(JSON.stringify(responseJson));
      })
    fetch('http://100.121.101.233:8000/users/student/1/', {
      method: 'PUT',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  `7419b3f8649566eeee73097184dd4541920af853`,
        Authorization: `Token 7419b3f8649566eeee73097184dd4541920af853`,

      },
      body:
        JSON.stringify({
          "user": 1,
          //"photo": "",
          "DOB": "1996-02-02",
          "first_sem_percentage": 71.0,
          "second_sem_percentage": 71.0,
          "third_sem_percentage": 73.0,
          "fourth_sem_percentage": 78.0,
          "fifth_sem_percentage": 72.0,
          "sixth_sem_percentage": 75.0,
          "seventh_sem_percentage": 78.0,
          "eighth_sem_percentage": 0.0,
          "branch": "Computer Science & Engineering"
        })




    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched

        Alert.alert(JSON.stringify(responseJson));

      });


  }
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('http://100.121.101.233:8000/users/student/1/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });
        console.log(this.state.dataSource);

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
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

            <Text style={styles.TextStyle}>Username:</Text>

            <TextInput
              style={{ flex: 1 }}
              placeholder="nirojhmg"
              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>DOB:</Text>

            <DatePicker
              style={{ flex: 1 }}
              //style={{width: 200}}
              date={this.state.dataSource.DOB}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1990/01/01"
              maxDate={new Date().getDate()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ DOB: DOB }) }}
            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>first_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}

              placeholder={this.dataSource.branch}
              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>second_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="second_sem_percentage"
              placeholder="nirojhmg"
              underlineColorAndroid="transparent"

            />

          </View>

        </View>



        <View style={styles.SectionStyle}>

          <Text style={styles.TextStyle}>Branch:</Text>


          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.Branches}
            //style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ Branches: itemValue })
            }>
            <Picker.Item label="Computer Science & Engineering" value="Computer Science & Engineering" />
            <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
            <Picker.Item label="Others" value="Others" />

          </Picker>

        </View>

        <TouchableOpacity style={styles.SubmitButton} onPress={this.ProfileSubmitFunction} >
          <Text style={styles.SubmitButtonTitle} >Submit</Text>
        </TouchableOpacity>

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
    borderRadius: 5,
    margin: 10
  },

  TextStyle: {
    flexDirection: 'row',
    margin: 0,

    resizeMode: 'stretch',
    alignItems: 'center'

  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
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