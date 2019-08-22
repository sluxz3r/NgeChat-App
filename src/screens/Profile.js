import React, { Component } from 'react';
import { Dimensions, ScrollView, Image, Text, View, ImageBackground, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Geocoder from 'react-native-geocoder';

class Profile extends Component {
    state = {
        data: this.props.navigation.state.params.data,
        name: this.props.navigation.state.params.data.name,
        status: this.props.navigation.state.params.data.status,
        image: this.props.navigation.state.params.data.image,
        latitude: this.props.navigation.state.params.data.latitude,
        longitude: this.props.navigation.state.params.data.longitude,
        address: null,
    };
    constructor(props) {
        super(props);
        this.buttonPress = this.buttonPress.bind(this);
        this.buttonPress2 = this.buttonPress2.bind(this);

    }
    buttonPress() {
        this.props.navigation.navigate('Chat', {data:this.state.data});
      }

      buttonPress2() {
        this.props.navigation.navigate('Maps', {data:this.state.data});
      }
    render() {
        console.log("tata", this.state.data);
        var pos = {
            lat: this.state.latitude,
            lng: this.state.longitude
        };

        Geocoder.geocodePosition(pos).then(res => {
            this.setState({
                address: res[0].formattedAddress
            })
        })
            .catch(error => alert(error));

        return (
            <View style={styles.container}>
                <View style={styles.conImage}>
                    <Image style={styles.image} source={{ uri: `${this.state.image}` }} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.status}> {this.state.status}</Text>
                    <View style={styles.conAdd}>
                        <Image style={styles.place} source={require('../assets/images/place.png')}/>
                        <Text style={styles.address}> {this.state.address}</Text>
                    </View>
                    <TouchableOpacity onPress={this.buttonPress} style={styles.loginButton}>
                        <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.buttonPress2} style={styles.loginButton} >
                        <Text style={styles.buttonText}>Maps</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
export default withNavigation(Profile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    conImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.4,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '55%',
        height: '77%',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'white'
    },
    conText: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
        padding: 10,
    },
    name: {
        fontSize: 22,
    },
    address: {
        fontSize: 14,
        textAlign:'center',
    },
    conAdd: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop:'10%',
        marginBottom:'10%'
    },
    place: {
        width: 20,
        height:20
    },
    status: {
        fontSize: 16,
        color:'#6a717a'
    },
    loginButton: {
        backgroundColor:'#2980b9',
        paddingVertical:15,
        marginTop:20
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical:20,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
    },

});