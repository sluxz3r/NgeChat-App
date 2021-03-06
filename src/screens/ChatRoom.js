import React, { Component } from 'react'
import {Fragment, View,  StyleSheet, AsyncStorage } from 'react-native'
import firebase from 'firebase'
import { GiftedChat } from 'react-native-gifted-chat'
import FirebaseSvc from '../firebase/firebase';
import Header from '../components/headerChat';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.navigation.state.params.name,
            uid: this.props.navigation.state.params.id,
            image:this.props.navigation.state.params.image,
            status:this.props.navigation.state.params.status,
            text: '',
            messagesList: [],

        }
    }
    //change will to did
    async componentDidMount() {
        this.setState({
            myuid: await AsyncStorage.getItem('uid'),
            myname: await AsyncStorage.getItem('name'),
            avatar : await AsyncStorage.getItem('image')
        })
            await firebase.database().ref('messages').child(this.state.myuid).child(this.state.uid)
                .on('child_added', (value) => {
                    this.setState((previousState) => {
                        return {
                            messagesList: GiftedChat.append(previousState.messagesList, value.val()),
                        }
                    })
                })
    }
    sendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.myuid).child(this.state.uid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.myuid,
                    name: this.state.myname,
                    avatar : this.state.avatar
                }
            }
            updates['messages/' + this.state.myuid + '/' + this.state.uid + '/' + msgId] = message;
            updates['messages/' + this.state.uid + '/' + this.state.myuid + '/' + msgId] = message;
            firebase.database().ref().update(updates)
            this.setState({ text: '' })

        }

        
    }
    render() {
        return (
            <>
            <Header name={this.state.name} image={this.state.image} status={this.state.status} />
            <GiftedChat
                text={this.state.text}
                messages={this.state.messagesList}
                onSend={this.sendMessage}
                showAvatarForEveryMessage={true}
                user={{
                    _id: this.state.myuid,
                    name: this.state.myname,
                    avatar : this.state.avatar
                }}
                onInputTextChanged={(value) => this.setState({ text: value })}
            />
            </>
        )
    }
}