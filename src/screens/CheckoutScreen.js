import React, { useContext } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { DataContext } from '../global/DataContext';
import CheckoutItemCards from '../components/CheckoutItemCard';

const CheckoutScreen = ({navigation}) =>{
    const {added} = useContext(DataContext);
    return (
        <>
          {added?.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text>Add items from list of products</Text>
            </View>
          ) : (
            <>
              <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.checkout}>Order Summary</Text>
                <CheckoutItemCards />
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}>
                  <Text style={styles.buttonText}>{'Proceed To Payment'}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 50,
    },
    checkout: {
        alignSelf: 'flex-start',
        marginLeft: 25,
        marginVertical: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#dd8299',
    },
    buttonContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#5c3d73',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
