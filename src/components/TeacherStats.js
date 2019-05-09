import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,Picker,ActivityIndicator
} from 'react-native';

import PureChart from 'react-native-pure-chart';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';


export default class TeacherStats extends Component {

  static navigationOptions = {
    title: 'Stats',    
  }
  constructor(props) {
    super(props);
    this.state = {
      
       isLoading: true,
       defaultAnimationDialog:true,
       language:'Academic',
       drop_down_data:[],
       data:[]
     };
     
   }
   showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  fn(){
    console.log("FUnction")
    this.setState({
      defaultAnimationDialog:false
     
    })
    console.log("language:"+this.state.language)
    if(this.state.language==='Academic'){
      console.log("StudentUsername:"+this.state.PickerValueHolder)
        
      fetch('http://100.121.101.233:8000/users/student/'+this.state.PickerValueHolder+'/')
      .then((response) => response.json())
      .then(data => {
         
  
          
    this.setState({ data: data})
    console.log("data:"+this.state.data)
  })
      .catch((error) => {
        console.error(error);
      })    
      this.setState({
       
        isLoading:false
      })
    }
  }
  componentDidMount(){
    fetch('http://100.121.101.233:8000/users/users/')
    .then((response) => response.json())
    .then(data => {
       

        
  this.setState({ drop_down_data: data.filter(d => d.is_student === true),PickerValueHolder:data.filter(d => d.is_student === true)[0].id})
  console.log("drop:"+this.state.drop_down_data)
})
    .catch((error) => {
      console.error(error);
    })
     
   
     
      
   }


  render() {
   
  if(this.state.isLoading){
    return(
      <View style={{flex: 1, padding: 20}}>
      <View style={styles.picker}>
      {/* <Picker
  selectedValue={this.state.language}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue},
      this.fn()
      )
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}
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
              title={"Select Type and Students "}
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
                onPress={() => {
                  this.fn()
                }}
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
          style={{width: 100}}
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Academic" value="Academic" />
          <Picker.Item label="Attendance" value="Attendance" />
          <Picker.Item label="Vote" value="Vote" />

        </Picker>
        <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            { this.state.drop_down_data.map((item, key)=>(
            <Picker.Item label={item.username} value={item.id} key={key} />)
            )}

          </Picker>
 
        </DialogContent>
        </Dialog>
</View>
        <ActivityIndicator/>
      </View>
    )
  }
  let sampleData = [
    {x: '1st sem', y: this.state.data.first_sem_percentage.toString()},
    {x: '2nd sem', y: this.state.data.second_sem_percentage.toString()},
    {x: '3rd sem', y: this.state.data.third_sem_percentage.toString()},
    {x: '4th sem', y: this.state.data.fourth_sem_percentage.toString()},
    {x: '5th sem', y: this.state.data.fifth_sem_percentage.toString()},
    {x: '6th sem', y: this.state.data.sixth_sem_percentage.toString()},
    {x: '7th sem', y: this.state.data.seventh_sem_percentage.toString()},
    {x: '8th sem', y: this.state.data.eighth_sem_percentage.toString()},

] 
    return (
     
   <View style={styles.container}>



   <PureChart type={'line'}
    data={sampleData}
    width={'100%'}
    height={200}
    customValueRenderer={(index, point) => {
      // if (index % 2 === 0) return null
      return (
        <Text style={{textAlign: 'center'}}>{point.y}</Text>
      )
    }}/>
        
  </View>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
   alignItems: 'stretch',  
   // backgroundColor: COLOR_PINK_LIGHT
  },
  picker:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  }
});

