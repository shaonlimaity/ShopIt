/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {DataContext} from '../global/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const OrdersSummary = ({route}) => {
  const {ordered, setOrdered} = useContext(DataContext);

  useEffect(() => {
    (async () => {
      const order = (await AsyncStorage.getItem('ordered')) || '';
      setOrdered(JSON.parse(order));
    })();
  }, [setOrdered]);

  var total;
  const {params} = route;

  const totalPrice = () => {
    total = 0;
    params?.map(item => (total += item?.product?.price * item?.count));
    return Math.round(total * 100) / 100;
  };

  const grandTotal = () => {
    let grand = (totalPrice(ordered) * 5) / 100 + totalPrice(ordered) + 5;
    return Math.round(grand * 100) / 100;
  };

  console.log(
    moment.duration(moment(new Date()).diff(params[0]?.date)).asMinutes(),
  );

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View
        style={styles.status}>
        {moment.duration(moment(new Date()).diff(params[0]?.date)).asMinutes() >
        10 ? (
          <Text
            style={styles.status}>
            DELIVERED
          </Text>
        ) : (
          <Text
            style={styles.status}>
            PROCESSING
          </Text>
        )}
        <View>
          <Text style={styles.dateTime}>
            {moment(params[0]?.date).format('LL')}
          </Text>
          <Text style={styles.dateTime}>
            {moment(params[0]?.date).fromNow()}{' '}
          </Text>
        </View>
      </View>
      {params?.map(item => (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item?.product?.thumbnail}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.desc} numberOfLines={2}>
              {item?.product?.description}
            </Text>
            <View style={styles.priceInfo}>
              <Text style={styles.price}>
                {`$ ${item?.product?.price}`} x {`${item?.count}`}
              </Text>
              <Text style={styles.price}>
                $ {item?.product?.price * item?.count}
              </Text>
            </View>
          </View>
        </View>
      ))}
      <View style={styles.orderContainer}>
        <Text style={styles.order}>Bill Details</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>Item total</Text>
          <Text style={styles.summary}>{`$ ${totalPrice(params)}`}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>Tax & Charges</Text>
          <Text style={styles.summary}>5%</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>Handling Charges</Text>
          <Text style={styles.summary}>$ 5</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.grandTotalText}>Grand Total</Text>
          <Text style={styles.grandTotal}>${grandTotal()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    marginVertical: 5,
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: '#fffdee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  infoContainer: {
    flex: 1,
    flexWrap: 'wrap',
    width: '70%',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: 100,
    paddingTop: 12,
  },
  button: {
    width: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 7,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  imageContainer: {
    borderWidth: 0.2,
    borderRadius: 15,
    marginLeft: 10,
  },
  image: {width: 90, height: 80, borderRadius: 15},
  orderContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 15,
    marginHorizontal: 4,
    borderWidth: 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  order: {
    fontSize: 22,
    color: '#FBB500',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 2,
  },
  summaryContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summary: {
    fontSize: 14,
    margin: 5,
    marginRight: -10,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  priceInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grandTotalText: {
    margin: 5,
    marginRight: -10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotal: {
    margin: 5,
    marginRight: -10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  desc: {fontSize: 15},
  dateTime: {textAlign: 'right', color: '#555', fontWeight: '500', marginRight: 4},
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginHorizontal: 5,
  },
});
