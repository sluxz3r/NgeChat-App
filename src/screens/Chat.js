import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import firebase from 'firebase'
import Geolocation from '@react-native-community/geolocation';
import { withNavigation } from 'react-navigation';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            users: [],
            data: [],
            uid: null,
            isLoading: true
        }
    }
    componentDidMount = async () => {
        this.myTimer = setInterval(() => this.getLocation(), 10000);
        this.myTimer2 = setInterval(() => this.updateLocation(), 10000);
        const uid = await AsyncStorage.getItem('uid')
        this.setState({ uid });
        this.setState({ refreshing: true });
        firebase.database().ref('messages/' + this.state.uid).on('child_added', (data) => {
            let person = data.val();
            person.id = data.key;
            this.state.chat.push({
                id: person.id
            })
            this.setState({ chat: this.state.chat })
        })

        firebase.database().ref('user/').once('value', (result) => {
            let data = result.val();
            if (data !== null) {
                let users = Object.values(data);
                this.setState({
                    users,
                    isLoading: false
                })
            }
        })
    };

    getLocation = async () => {
        Geolocation.getCurrentPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        });

    }
    updateLocation = async () => {
        AsyncStorage.getItem('uid', (error, result) => {
            if (result) {
                if (this.state.latitude) {
                    firebase.database().ref('user/' + result).update({
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    })
                }
            }
        });
    }

    componentWillUnmount = () => {
        clearInterval(myTimer);
        clearInterval(myTimer2);
    }
    render() {
        const users = this.state.users;
        const chat = this.state.chat
        const data = []
        chat.forEach((kocak, key) => {
            data[key] = users.find((item) => item.id === kocak.id)
        })
        return (
            <View>
                {this.state.isLoading == true ?
                    <View style={{ height: Dimensions.get('screen').height * 0.8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator color={'#3498db'} size={'large'} />
                    </View> :
                    <FlatList
                        data={data}
                        numColumns={1}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => { this.props.navigation.navigate('Chat', item) }}>
                                    <View style={styles.item}>
                                        <Image style={styles.image} source={{ uri: `${item.image}` }} />
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.textName}>{item.name}</Text>
                                        <Text style={styles.textStatus}>{item.status}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />}
            </View>
        )
    }
}
export default withNavigation(Chat)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: 'white'
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
    button: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderColor: '#c4c4c4',
        margin: 4,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    content: {
        flex: 5,
        paddingLeft: 5,
    },
    textName: {
        fontSize: 18,
        color: "#1c1c1c"
    },
    textStatus: {
        fontSize: 14,
        color: "#1c1c1c"
    }
});

// omponentWillMount = async () => {
//     const uid = await AsyncStorage.getItem('uid')
//     this.setState({ uid });
//     this.setState({ refreshing: true });
//     firebase.database().ref('messages/' + this.state.uid).once('child_added', (result) => {
//         let data = result.val();
//         console.log("DATA",Object.values(data))
//       if (data !== null) {
//         let chats = data;
//         this.setState({
//           chats
//         })
//       }
//     })
// }
// get last messages