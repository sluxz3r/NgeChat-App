import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet, Dimensions, Image } from 'react-native'
import { withNavigation } from 'react-navigation';

class Header extends Component {
    state = {
        name: null,
    }
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };
    hideLogout = async () => {
        let keys = ['uid', 'name', 'image']
        await AsyncStorage.multiRemove(keys, (error) => {
            this.props.navigation.navigate('Login')
        });

    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Image style={styles.image} source={{ uri: `${this.props.image}` }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.textName}>{this.props.name}</Text>
                    <Text style={styles.textStatus}>{this.props.status}</Text>
                </View>
            </View>
        )
    }
}

export default withNavigation(Header)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498db',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#c4c4c4',
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
        color: "white"
    },
    textStatus: {
        fontSize: 14,
        color: "white"
    }
});