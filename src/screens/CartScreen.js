import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import CartItemCards from '../components/CartItemsCard';
import { DataContext } from '../global/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({navigation}) =>{
  const {added, setAdded} = useContext(DataContext);

  useEffect(() => {
    (async () => {
      const added1 = (await AsyncStorage.getItem('added')) || '';
      setAdded(JSON.parse(added1));
    })();
  }, [setAdded]);

  return (
      <>
        {added?.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text>Add items from list of products</Text>
          </View>
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.checkout}>Cart Summary</Text>
              <CartItemCards added={added} setAdded={setAdded} />
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.buttonText}>{'Proceed To Checkout >'}</Text>
            </TouchableOpacity>
          </>
        )}
      </>
  );
};

export default CartScreen;

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
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#5c3d73',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
