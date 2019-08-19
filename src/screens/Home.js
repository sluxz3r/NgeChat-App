import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, AsyncStorage, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '../components/header';
import Maps from '../screens/Maps';
import Chat from '../screens/Chat';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase'



class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'Chat', title: 'Chat' },
        { key: 'Maps', title: 'Maps' },
      ],
    }
    this.getLocation()
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
          console.log('this', this.state.latitude)
          firebase.database().ref('user/' + result).update({
            latitude: this.state.latitude,
            longitude: this.state.longitude
          })

        }
      }
    }
    )
  }
  render() {
    this.updateLocation()
    return (
      <ScrollView>
        <View style={{ flex: 1, }}>
          <Header />
          <TabView
            navigationState={this.state}
            labelStyle={{ backgroundColor: 'red' }}
            renderScene={SceneMap({
              Chat: Chat,
              Maps: Maps

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
      </ScrollView>
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
    fontWeight:'700'
  }
});