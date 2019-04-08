import Login from './Login'
import Splash from './Splash'
import Registration from './Registration'
import StudentDashboard from './StudentDashboard'
import StudentRegister from './StudentRegister'
import {createStackNavigator, createAppContainer} from 'react-navigation'
const AppNavigator = createStackNavigator({
    //Screens   
    Splash: {
        screen: Splash
    },
    Login: {
        screen: Login
    },
    Registration:{
        screen:Registration
    },
    StudentDashboard:{
        screen:StudentDashboard
    },
    StudentRegister:{
        screen:StudentRegister
    }
}, {
    //settings
    initialRouteName: 'Splash'
})
export default createAppContainer(AppNavigator)