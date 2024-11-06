/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {DataContext} from '../global/DataContext';
import OrderedItemCard from '../components/OrderedItemCard';

const OrdersScreen = ({navigation}) => {
  const {ordered} = useContext(DataContext);
  console.log('ordered', ordered);
  return ordered?.length === 0 ? (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text>No Orders Yet</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <OrderedItemCard ordered={ordered} navigation={navigation}/>
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
