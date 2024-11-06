/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
    Alert,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DataContext} from '../global/DataContext';

const AccountScreen = ({navigation}) => {
  const {name, email, phone} = useContext(DataContext);
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.header}>Hello</Text>
          {name && <Text style={styles.header}> {name}</Text>}
          <Text style={styles.header}>,</Text>
        </View>
        {email && <Text style={styles.profileInfoText}>Email: {email}</Text>}
        {phone && <Text style={styles.profileInfoText}>Contact: {phone}</Text>}
        <View style={styles.content}>
          <Text style={styles.infoText}>YOUR INFORMATIONS</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.inputContainer}>
            <Text style={styles.inputField}>Profile</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            style={styles.inputContainer}>
            <Text style={styles.inputField}>Orders</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <View style={{height: 20}} />
          <Text style={styles.infoText}>OTHER INFORMATIONS</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutUs')}
            style={styles.inputContainer}>
            <Text style={styles.inputField}>About Us</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FAQs')}
            style={styles.inputContainer}>
            <Text style={styles.inputField}>FAQs</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('App is not live yet!')} style={styles.inputContainer}>
            <Text style={styles.inputField}>Share App</Text>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.version}>
          <Text style={styles.versionText}>ShopIt Version 1.0.0</Text>
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
    backgroundColor: '#ffffee',
  },
  header: {fontSize: 30, fontWeight: 'bold'},
  content: {marginVertical: 15},
  inputContainer: {
    borderBottomWidth: Platform.OS === 'ios' ? 0.18 : 0.2,
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
  profileInfoText: {marginTop: 3, color: '#949400', fontWeight: 'bold'},
  infoText: {marginTop: 30, color: '#949494', fontWeight: 'bold'},
  version: {flex: 1, justifyContent: 'flex-end', padding: 20},
  versionText: {textAlign: 'center', color: '#fe8d01', fontWeight: 'bold'},
});
