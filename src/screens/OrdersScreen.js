/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {DataContext} from '../global/DataContext';
import OrderedItemCard from '../components/OrderedItemCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrdersScreen = ({navigation}) => {
  const {ordered, setOrdered} = useContext(DataContext);

  useEffect(() => {
    (async () => {
      const order = (await AsyncStorage.getItem('ordered')) || '';
      setOrdered(JSON.parse(order));
    })();
  }, [setOrdered]);
  return ordered?.length === 0 ? (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text>No Orders Yet</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {ordered?.map(item => (
        <OrderedItemCard ordered={item} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 20,
  },
});
