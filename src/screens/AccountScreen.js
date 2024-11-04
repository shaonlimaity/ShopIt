import React from 'react';
import {Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({navigation}) => {
  return (
    <TouchableWithoutFeedback style={{backgroundColor: '#ffb668'}} onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>Hello</Text>
        <View style={styles.content}>
          <Text style={styles.infoText}>YOUR INFORMATIONS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.inputContainer}>
            <Text style={styles.inputField}>Profile</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Order')} style={styles.inputContainer}>
            <Text style={styles.inputField}>Orders</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <View style={{height: 20}} />
          <Text style={styles.infoText}>OTHER INFORMATIONS</Text>
          <TouchableOpacity style={styles.inputContainer}>
            <Text style={styles.inputField}>About Us</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputContainer}>
            <Text style={styles.inputField}>FAQs</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputContainer}>
            <Text style={styles.inputField}>Share App</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', padding: 20}}>
          <Text style={{textAlign: 'center', color:'#fe8d01', fontWeight:'bold'}}>ShopIt Version 1.0.0</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffdbbb',
  },
  header: {fontSize: 30, fontWeight: 'bold'},
  content: {marginVertical: 15},
  inputContainer: {
    borderBottomWidth: 0.18,
    height: 70,
    marginTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputField: {fontSize: 18, fontWeight: 'bold'},
  icon: {marginTop: 4.5, marginLeft: 5},
  infoText: {marginTop: 30, color: '#949494', fontWeight: 'bold'},
});
