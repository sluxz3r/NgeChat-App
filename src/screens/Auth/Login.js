import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, TextInput, TouchableOpacity, Text, View, StyleSheet, Image, Alert, AsyncStorage, KeyboardAvoidingView, StatusBar } from 'react-native'
import FirebaseSvc from '../../firebase/firebase';
import firebase from 'firebase'
import { withNavigation } from 'react-navigation';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading:false,
        };
    }
    onPressLogin = async () => {
        this.setState({isLoading:true})
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (result) => {
                await firebase.database().ref('/user/' + result.user.uid).update({ status: 'online' })
                this.setState({isLoading:false})
                console.log('resulttttt', result)
                AsyncStorage.setItem('uid', result.user.uid);
                AsyncStorage.setItem('name', result.user.displayName);
                AsyncStorage.setItem('image', result.user.image);
                AsyncStorage.getItem('uid', (error, result) => {
                    if (result) {
                        this.setState({
                            email: '',
                            password: ''
                        })
                        Alert.alert(
                            'Login',
                            'Login Success',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                            ],
                        );
                    }
                })
            }).catch(async(err)=>{
                this.setState({
                    isLoading:false
                })
            })
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
                        style={styles.inputField}
                        placeholder={'email'}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType='next'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        autoCorrect={false} />

                    <TextInput
                        style={styles.inputField}
                        placeholder={'password'}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType='go'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password} 
                        ref={(input) => this.passwordInput = input}/>
                    {this.state.isLoading == false ? 
                    <TouchableOpacity style={styles.loginButton} onPress={this.onPressLogin}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>:<ActivityIndicator color='white' size={'large'} />}
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('register') }}>
                        <Text style={{ color: 'white', marginTop: 5, textAlign:'right' }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
export default withNavigation(Login);
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
        paddingVertical:15,
        marginBottom:10
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700'
    },

})