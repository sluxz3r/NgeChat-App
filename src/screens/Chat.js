import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import firebase from 'firebase'
import { withNavigation } from 'react-navigation';


class Chat extends Component {
    state = {
        users: [],
        uid: null,
        refreshing: false
    }

    componentWillMount = async () => {
        const uid = await AsyncStorage.getItem('uid')
        this.setState({ uid });
        this.setState({ refreshing: true });
        firebase.database().ref('user').on('child_added', (data) => {
            let person = data.val();
            person.id = data.key;
            console.log('uidyid', person.id)

            if (person.id != this.state.uid) {
                this.setState((prevData) => {
                    return {
                        users: [...prevData.users, person]
                    }
                })
                this.setState({ refreshing: false });
            }
        })
    }
    render() {
        console.log(this.state.users)
        return (
            <View>
                <FlatList
                    data={this.state.users}
                    numColumns={1}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => { this.props.navigation.navigate('Chat', item) }}>
                                <View style={styles.item} key={index}>
                                    <Image style={styles.image} source={{ uri: `${item.image}` }} />
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.TextName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
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
        borderBottomWidth: 1,
        borderColor: '#c4c4c4',
        margin: 4,
    },
    container: {
        flex: 1
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
        flex: 4,
        paddingLeft: 17,
    },
    TexContent: {
        fontSize: 13,
    },
    TextName: {
        fontSize: 17,
        color: "#1c1c1c"
    }
});

