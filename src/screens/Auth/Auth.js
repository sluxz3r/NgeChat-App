import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import Login from '../Auth/Login';
import firebase from 'firebase'

export default class Loading extends React.Component {
  state = {
    uid: null,
  };
  constructor(props) {
    super(props);
    AsyncStorage.getItem('uid').then((value) => {
      this.setState({ uid: value })
    })
  }
  render() {
    console.log('uid',this.state.uid)
    return (
      <View style={styles.container}>
        {this.state.uid == null ?
          (<Login />) :
          (this.props.navigation.navigate('Home'))}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})