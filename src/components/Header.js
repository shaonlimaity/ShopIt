import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () =>{
    return (
        <View style={styles.container}>
            <Text>ShopIt</Text>
            <Text>from the comfort of your home</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});
