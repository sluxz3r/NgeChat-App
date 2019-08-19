/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './src/screens/Splash';

class Main extends Component {
    constructor(properties) {
      super(properties);
      this.state = { currentScreen: 'Splash' };
      setTimeout(() => {
        this.setState({ currentScreen: 'App' });
      }, 2000);
    }
    render() {
      const { currentScreen } = this.state;
      let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />;
      return mainScreen;
    }
  }

AppRegistry.registerComponent(appName, () => Main);
