import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import HomeScreen from '../screens/Home';
import MapsScreen from '../screens/Maps';
import AuthScreen from '../screens/Auth/Auth';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ChatRoom from '../screens/ChatRoom';
import Profile from '../screens/Profile';

const createStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Maps: { screen: MapsScreen },
    Chat : {screen: ChatRoom},
    Profile: { screen: Profile }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const stackAuth = createStackNavigator(
  {
    Login: { screen: LoginScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const createSwitch = createSwitchNavigator(
  {
    authLoading: { screen: AuthScreen },
    login: { screen: LoginScreen },
    register: { screen: RegisterScreen},
    App: createStack,
    Auth: stackAuth,
    

  },
  {
    initialRouteName: 'authLoading'
    // initialRouteName: 'login'
  }
);

export default Appcontainer = createAppContainer(createSwitch);