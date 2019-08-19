import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Text,
    Image,
    StatusBar,
} from 'react-native';

export default class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#3498db' barStyle="light-content" />
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logoSplash} />
                <Text style={styles.title}>NgeChat</Text>
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logoSplash: {
        width: 200,
        height: 200,
    },
    title: {
        color: '#FFF',
        opacity: 0.8,
        fontSize: 18
    },
});