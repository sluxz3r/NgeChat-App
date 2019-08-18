import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, AsyncStorage, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import MapView, { AnimatedRegion } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';



class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
    }
  }

  componentDidMount() {
    this.watchID = geolocation.getCurrentPosition((position) => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error) => console.log(error));
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <View style={styles.con}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          minZoomLevel={2}  // default => 0
          maxZoomLevel={20} // default => 20
          // onRegionChange={this.onRegionChange.bind(this)}
        >
          <MapView.Marker
            coordinate={{
              latitude: (this.state.lastLat + 0.00050) || -36.82339,
              longitude: (this.state.lastLong + 0.00050) || -73.03569,
            }}
            description={"This is a marker in React Natve"}>
            <View>
              <Text style={{ color: '#000' }}>
                {this.state.lastLong} / {this.state.lastLat}
              </Text>
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}
export default Maps;
const styles = StyleSheet.create({
  con:{
    flex:1,
    width: Dimensions.get('screen').width,
  },
  map: {
    width: '100%',
    height: '100%'
  }
})