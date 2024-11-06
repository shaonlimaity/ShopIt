import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FAQsScreen = () =>{
    return (
        <View style={styles.container}>
            <Text>FAQs Screen</Text>
        </View>
    );
};

export default FAQsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
