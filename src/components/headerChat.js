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
        console.log(this.props.name)
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Image style={styles.image} source={{ uri: `${this.props.image}` }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.TextName}>{this.props.name}</Text>
                    <Text style={styles.Status}>{this.props.status}</Text>
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
    },
    item: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 30,
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
    },
    Status:{
        fontSize: 14,
        color: "white"
    }
});