import React, { Component } from 'react'
import { Text, View, TouchableOpacity,AsyncStorage } from 'react-native'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import Menu, { MenuItem } from 'react-native-material-menu';
import { withNavigation } from 'react-navigation';

class Header extends Component {
    state={
        name:null,
    }
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };
    hideLogout = async () => {
        let keys = ['uid','name','image']
        await AsyncStorage.multiRemove(keys, (error)=>{
            this.props.navigation.navigate('Login')
        });
        
      };
    render() {
        console.log(this.props.name)
        return (
            <View style={{ padding: 8, backgroundColor: '#3498db', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, padding:10, fontWeight:'600' }}>HIYA</Text>
                </View>
            </View>
        )
    }
}

export default withNavigation(Header)