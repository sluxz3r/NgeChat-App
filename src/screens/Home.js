import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, AsyncStorage, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '../components/header';
import Maps from '../screens/Maps';
import Chat from '../screens/Chat';
import Friends from '../screens/FriendList';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      name: null,
      routes: [
        { key: 'Chat', title: 'Chat' },
        { key: 'Maps', title: 'Maps' },
        { key: 'Friends', title: 'Friends' },
      ],
    }
    this.getLocation()
  }
  componentWillMount = async () => {
    await AsyncStorage.getItem('name').then((value) => {
      this.setState({
        name: value,
      })
    })
  }
  getLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      })
    });
  }
  updateLocation = async () => {
    AsyncStorage.getItem('uid', (error, result) => {
      if (result) {
        if (this.state.latitude) {
          firebase.database().ref('user/' + result).update({
            latitude: this.state.latitude,
            longitude: this.state.longitude
          })
        }
      }
    });
  }
  render() {
    this.updateLocation()
    return (
      <View style={{ flex: 1, }}>
        <StatusBar backgroundColor='#3498db' barStyle="light-content" />
        <Header name={this.state.name} />
        <TabView
          navigationState={this.state}
          labelStyle={{ backgroundColor: 'red' }}
          renderScene={SceneMap({
            Chat: Chat,
            Maps: Maps,
            Friends: Friends,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height: 100 }}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={styles.tabNav}
              labelStyle={styles.labelStyle}
            />
          }
        />
      </View>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'black',
    marginTop: 20,
    width: 270,
    height: 40,
    borderRadius: 20,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  tabNav: {
    backgroundColor: '#3498db'
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '700'
  }
});