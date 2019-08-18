import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import HomeScreen from '../screens/Home';

import MapsScreen from '../screens/Maps';

import AuthScreen from '../screens/Auth';

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const MapsStack = createStackNavigator(
  {
    Maps: { screen: MapsScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Auth: { screen: AuthScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);


const switchNavigator = createBottomTabNavigator(
  {
    Chat: { screen: HomeStack },
    Maps: { screen: MapsStack },
    Profile: { screen: AuthStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Chat') {
          iconName = `md-chatbubbles`;
        } else if (routeName === 'Maps') {
          iconName = `md-map`;
        } else if (routeName === 'Profile') {
          iconName = `md-contacts`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00c0ff',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(switchNavigator)