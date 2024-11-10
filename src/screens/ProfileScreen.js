/* eslint-disable no-useless-escape */
import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DataContext} from '../global/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const {name, setName, email, setEmail, phone, setPhone} =
    useContext(DataContext);
  const [userName, setUserName] = useState('');
  const [nameEdited, setNameEdited] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailEdited, setEmailEdited] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [phoneEdited, setPhoneEdited] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    (async () => {
      const names = (await AsyncStorage.getItem('name')) || '';
      setName(JSON.parse(names));
      const emails = (await AsyncStorage.getItem('email')) || '';
      setEmail(JSON.parse(emails));
      const phones = (await AsyncStorage.getItem('phone')) || '';
      setPhone(JSON.parse(phones));
    })();
  }, [setEmail, setName, setPhone]);

  useEffect(() => {
    if (nameEdited && (userName?.length < 5 || userName?.length > 30)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [userName, nameEdited]);

  useEffect(() => {
    const regex = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (userEmail !== '' && !regex.test(userEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [userEmail, emailEdited]);

  useEffect(() => {
    const regex =
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (userPhone !== '' && !regex.test(userPhone)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }, [userPhone, phoneEdited]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Your Name : </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name={'person-sharp'}
              size={20}
              color={'black'}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Enter your name'}
              style={styles.inputField}
              value={!nameEdited ? name : userName}
              onChangeText={text => {
                setUserName(text);
                setNameEdited(true);
              }}
              keyboardType="name-phone-pad"
              keyboardAppearance="light"
            />
          </View>
          {nameError && (
            <Text style={styles.errorText}>
              Name should have between 5 to 50 characters
            </Text>
          )}
        </View>
        <View style={styles.content}>
          <Text>Email : </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name={'mail'}
              size={20}
              color={'black'}
              style={styles.icon}
            />
            <TextInput
              placeholder={'abc@example.com'}
              style={styles.inputField}
              value={!emailEdited ? email : userEmail}
              onChangeText={text => {
                setUserEmail(text);
                setEmailEdited(true);
              }}
              keyboardType="email-address"
              keyboardAppearance="light"
            />
          </View>
          {emailError && (
            <Text style={styles.errorText}>Please enter a valid email id</Text>
          )}
        </View>
        <View style={styles.content}>
          <Text>Phone : </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name={'call-sharp'}
              size={20}
              color={'black'}
              style={styles.icon}
            />
            <TextInput
              placeholder={'XXX XXX XXXX'}
              style={styles.inputField}
              value={!phoneEdited ? phone : userPhone}
              onChangeText={text => {
                setUserPhone(text);
                setPhoneEdited(true);
              }}
              keyboardType="numeric"
              keyboardAppearance="light"
              key={{color: 'white'}}
            />
          </View>
          {phoneError && (
            <Text style={styles.errorText}>
              Please enter a valid phone number
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (nameEdited) {
                setName(userName);
                AsyncStorage.setItem('name', JSON.stringify(userName));
              }
              if (emailEdited) {
                setEmail(userEmail);
                AsyncStorage.setItem('email', JSON.stringify(userEmail));
              }
              if (phoneEdited) {
                setPhone(userPhone);
                AsyncStorage.setItem('phone', JSON.stringify(userPhone));
              }
              Alert.alert('Updated Successfully!');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.buttonContainer}>
            <Text style={[styles.buttonText, {color: '#ff5069'}]}>Logout</Text>
          </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content: {marginVertical: 15},
  inputContainer: {
    borderBottomWidth: 0.5,
    height: 40,
    marginTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  inputField: {width: '90%', height: 50, marginLeft: 10, paddingBottom: 20},
  icon: {marginTop: Platform.OS === 'ios' ? 5 : 10, marginLeft: 5},
  buttonContainer: {
    flex: 1,
    marginVertical: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#285FFA',
    borderRadius: 30,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  errorText: {fontSize: 11, marginTop: 5, color: 'red', textAlign: 'right'},
});
