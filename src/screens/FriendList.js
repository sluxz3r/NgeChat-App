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

class Friend extends Component {
    constructor(props) {
        super(props);
    this.state = {
        users: [],
        uid: null,
        refreshing: false
    }
}

    componentDidMount = async () => {
        const uid = await AsyncStorage.getItem('uid')
        this.setState({ uid });
        this.setState({ refreshing: true });
        firebase.database().ref('user').on('child_added', (data) => {
            let person = data.val();
            person.id = data.key;
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
        return (
            <View>
                <FlatList
                    data={this.state.users}
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
                />
            </View>
        )
    }
}
export default withNavigation(Friend)
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

