import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import Menu, { MenuItem } from 'react-native-material-menu';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';

class Header extends Component {
    state = {
        index:0,
        name: null,
    }
    constructor(props) {
        super(props);
        this.buttonPress = this.buttonPress.bind(this);
    }
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };

    Logout = async () => {
        const userToken = await AsyncStorage.getItem('uid');
        firebase.database().ref('/user/' + userToken).update({ status: "offline" })
        let keys = ['uid', 'name', 'image']
        await AsyncStorage.multiRemove(keys, (error) => {
            this.props.navigation.navigate('Login')
        });

    };

    buttonPress() {
        this._menu.hide();
        this.props.navigation.navigate('ProfileUser', { name: this.props.name, uid:this.props.uid });
    };
    render() {
        return (
            <View style={{ padding: 8, backgroundColor: '#3498db', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, padding: 10, fontWeight: '600' }}>NgeChat</Text>
                </View>
                <Menu
                    
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}>
                        <Entypo name='dots-three-vertical' size={25} color='#f5f6f7' />
                    </Text>}
                >
                    <MenuItem onPress={this.buttonPress} key={1} >{this.props.name}</MenuItem>
                    <MenuItem key={2} onPress={this.Logout}>Logout</MenuItem>
                </Menu>
            </View>
        )
    }
}

export default withNavigation(Header)