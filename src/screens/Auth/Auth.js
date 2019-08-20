import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import Login from '../Auth/Login';
import firebase from 'firebase'

export default class Loading extends React.Component {
  state = {
    uid: null,
    isLoading:true,
  };
  constructor(props) {
    super(props);
    
  }

  componentDidMount=async()=>{
    await AsyncStorage.getItem('uid').then((value) => {
      this.setState({ 
        uid: value, 
        isLoading: false,
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='#3498db' barStyle="light-content" />
        {this.state.isLoading == false ?this.state.uid == null ?
          (<Login />) :
          (this.props.navigation.navigate('Home')):<ActivityIndicator color={'white'} size={'large'}/>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db'
  }
})