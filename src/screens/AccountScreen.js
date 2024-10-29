/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DataContext } from '../global/DataContext';

const AccountScreen = () =>{
    const {name, setName, email, setEmail, phone, setPhone} = useContext(DataContext);
    const [userName, setUserName] = useState('');
    const [nameEdited, setNameEdited] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [emailEdited, setEmailEdited] = useState(false);
    const [userPhone, setUserPhone] = useState('');
    const [phoneEdited, setPhoneEdited] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Your Name : </Text>
                <View style={styles.inputContainer}>
                    <Ionicons name={'person-sharp'} size={20} color={'black'} style={styles.icon} />
                    <TextInput
                        placeholder={'Enter your name'}
                        style={styles.inputField}
                        value={name}
                        onChangeText={text => {
                            setUserName(text);
                            setNameEdited(true);
                        }}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <Text>Email : </Text>
                <View style={styles.inputContainer}>
                    <Ionicons name={'mail'} size={20} color={'black'} style={styles.icon} />
                    <TextInput
                        placeholder={'abc@example.com'}
                        style={styles.inputField}
                        value={email}
                        onChangeText={text => {
                            setUserEmail(text);
                            setEmailEdited(true);
                        }}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <Text>Phone : </Text>
                <View style={styles.inputContainer}>
                    <Ionicons name={'call-sharp'} size={20} color={'black'} style={styles.icon} />
                    <TextInput
                        placeholder={'XXX XXX XXXX'}
                        style={styles.inputField}
                        value={phone}
                        onChangeText={text => {
                            setUserPhone(text);
                            setPhoneEdited(true);
                        }}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    if(nameEdited) {setName(userName);}
                    if(emailEdited) {setEmail(userEmail);}
                    if(phoneEdited) {setPhone(userPhone);}
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={[styles.buttonText, {color: '#ff5069'}]}>Logout</Text>
            </View>
        </View>
    );
};

export default AccountScreen;

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
    inputField: {width: '90%', marginLeft: 10},
    icon: {marginTop: 4.5, marginLeft: 5},
    buttonContainer: {
        flex:1,
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
});
