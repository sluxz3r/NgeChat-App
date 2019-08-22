import React, { Component } from 'react';
import { Dimensions, ScrollView, Image, Text, View, ImageBackground, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Geocoder from 'react-native-geocoder';
import firebase from 'firebase'

class ProfileUser extends Component {
    state = {
        name: this.props.navigation.state.params.name,
        uid: this.props.navigation.state.params.uid,
        users: [],
        address: null,
    }
    componentDidMount = async () => {
        await firebase.database().ref('user/' + this.state.uid).once('value', (result) => {
            let data = result.val();
            console.log(data)
            if (data !== null) {
                let users = data;
                this.setState({
                    users,
                })
            }
        })
    }
    Logout = async () => {
        const userToken = await AsyncStorage.getItem('uid');
        firebase.database().ref('/user/' + userToken).update({ status: "offline" })
        let keys = ['uid', 'name', 'image']
        await AsyncStorage.multiRemove(keys, (error) => {
            this.props.navigation.navigate('Login')
        });
        this.setState({
            users:[]
        })

    };
    render() {
        console.log("tata", this.state.users);
        var pos = {
            lat: this.state.users.latitude,
            lng: this.state.users.longitude
        };

        Geocoder.geocodePosition(pos).then(res => {
            this.setState({
                address: res[0].formattedAddress
            })
        })
        return (
            <View style={styles.container}>
                <View style={styles.conImage}>
                    <Image style={styles.image} source={{ uri: `${this.state.users.image}` }} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.name}>{this.state.users.name}</Text>
                    <Text style={styles.status}> {this.state.users.status}</Text>
                    <View style={styles.conAdd}>
                        <Image style={styles.place} source={require('../assets/images/place.png')} />
                        <Text style={styles.address}> {this.state.address}</Text>
                    </View>
                    <TouchableOpacity onPress={this.Logout} style={styles.loginButton} >
                        <Text style={styles.buttonText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
export default withNavigation(ProfileUser);
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
        textAlign: 'center',
    },
    conAdd: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
        marginBottom: '20%'
    },
    place: {
        width: 20,
        height: 20
    },
    status: {
        fontSize: 16,
        color: '#6a717a'
    },
    loginButton: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
    },

});