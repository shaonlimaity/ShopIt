/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {DataContext} from '../global/DataContext';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutItemCards = ({added, setAdded}) => {
  const {data, setData} = useContext(DataContext);
  var total;

  useEffect(() => {
    (async () => {
      const data1 = (await AsyncStorage.getItem('data')) || '';
      setData(JSON.parse(data1));
    })();
  }, [setData]);

  // useEffect(() => {
  //   fetch(
  //     'https://dummyjson.com/products/category/groceries',
  //   )
  //     .then(res => res.json())
  //     .then(response => {
  //       setData(response?.items);
  //     });
  // }, [setData]);

  const checkCount = i => {
    let count = 0;
    added?.map(item => (item === i ? count++ : null));
    return count;
  };

  const removeElement = item => {
    let index = added?.lastIndexOf(item);
    setAdded(
      added?.slice(0, index).concat(added?.slice(index + 1, added?.length)),
    );
    AsyncStorage.setItem(
      'added',
      JSON.stringify(
        added.slice(0, index).concat(added.slice(index + 1, added.length)),
      ),
    );
  };

  const totalPrice = arr => {
    total = 0;
    arr?.map(n => (total += n.price * checkCount(n.id)));
    return Math.round(total * 100) / 100;
  };

  const grandTotal = () => {
    let grand =
      (totalPrice(data?.filter(i => added?.includes(i.id))) * 5) / 100 +
      totalPrice(data?.filter(i => added?.includes(i.id))) +
      5;
    return Math.round(grand * 100) / 100;
  };

  return (
    <>
      {data
        ?.filter(i => added?.includes(i.id))
        ?.map(item => (
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={{fontSize: 20}} numberOfLines={1}>
                {item?.title}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 10,
                }}>{`$ ${item?.price}`}</Text>
            </View>
            <View>
              <View style={styles.content}>
                <View style={styles.button}>
                  <Text
                    style={styles.buttonText}
                    onPress={() => {
                      if (checkCount(item?.id) >= 1) {
                        removeElement(item?.id);
                      }
                    }}>
                    -
                  </Text>
                  <Text style={[styles.buttonText, {marginHorizontal: 7}]}>
                    {checkCount(item?.id)}
                  </Text>
                  <Text
                    style={[styles.buttonText, {bottom: 1}]}
                    onPress={() => {
                      setAdded(current => [...current, item?.id]);
                      AsyncStorage.setItem('added', JSON.stringify([...added, item?.id]));
                    }}>
                    +
                  </Text>
                </View>
                <Text style={{fontSize: 15, marginTop: 10}}>{`$ ${
                  Math.round(item?.price * checkCount(item?.id) * 100) / 100
                }`}</Text>
              </View>
            </View>
          </View>
        ))}
      <View style={styles.orderContainer}>
        <Text style={styles.order}>Bill Details</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>Item total</Text>
          <Text style={styles.summary}>
            {`$ ${totalPrice(data?.filter(i => added?.includes(i.id)))}`}
          </Text>
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
          <Text style={[styles.summary, {fontSize: 16, fontWeight: 'bold'}]}>
            Grand Total
          </Text>
          <Text
            style={[
              styles.summary,
              {fontSize: 16, fontWeight: 'bold', color: 'green'},
            ]}>
            ${grandTotal()}
          </Text>
        </View>
      </View>
    </>
  );
};

export default CheckoutItemCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    marginVertical: 5,
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: '#fffdee',
  },
  infoContainer: {
    flex: 1,
    width: '70%',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 15,
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
    alignSelf: 'flex-end',
    top: 5,
  },
  image: {width: 90, height: 80, borderRadius: 15},
  orderContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginHorizontal: 4,
    borderWidth: 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  order: {
    fontSize: 22,
    color: '#FBB500',
    fontWeight: 'bold',
    margin: 10,
  },
  summaryContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
  summary: {
    fontSize: 14,
    margin: 5,
  },
});
