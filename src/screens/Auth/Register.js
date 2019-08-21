import React, { Component } from 'react'
import { Dimensions,Image, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity, Text, View, StyleSheet, Alert, AsyncStorage } from 'react-native'
import firebase from 'firebase'
import firebaseSvc from '../../firebase/firebase';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            id_user: '',
            name: '',
        }
    };

    register = async () => {
        if (this.state.email.length < 4) {
            Alert.alert('Email Invalid')
        } else if (this.state.password.length < 1) {
            Alert.alert('please input password more than 2')
        } else if (this.state.name.length < 3) {
            Alert.alert('please input password more than 3')
        } else {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(({ user }) => {
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: this.state.name, photoURL: this.state.image })
                    firebase.database().ref('user/' + user.uid).set({
                        name: this.state.name,
                        image: 'https://res.cloudinary.com/dbhwvh1mf/image/upload/v1566321024/img/blank-profile-picture-973460_960_720_wolhdp.png',
                        id: user.uid
                    })
                })
            this.props.navigation.navigate('login')
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar backgroundColor='#3498db' barStyle="light-content" />
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logo.png')}
                    />
                    <Text style={styles.title}>NgeChat</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Name'
                        style={styles.inputField}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType='next'
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name} />

                    <TextInput
                        placeholder='email'
                        style={styles.inputField}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType='next'
                        maxLength={40}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        autoCorrect={false} />

                    <TextInput
                        placeholder='password'
                        style={styles.inputField}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType='go'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password} />


                    <TouchableOpacity style={styles.loginButton} onPress={this.register}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('login') }}>
                        <Text style={{ color: 'white', marginTop: 5, textAlign:'left' }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

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
    logo: {
        width: 120,
        height: 120
    },
    title: {
        color: '#FFF',
        opacity: 0.8,
        fontSize:18
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical:10
    },
    inputField: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,

    },
    loginButton: {
        backgroundColor:'#2980b9',
        paddingVertical:15
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700'
    },
})