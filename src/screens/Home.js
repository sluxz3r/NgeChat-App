import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, AsyncStorage, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, }}>
         <Text>HOME CHAT</Text>
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;