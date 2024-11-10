/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {DataContext} from '../global/DataContext';
import {View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartItemCards = ({added, setAdded}) => {
  const {data, setData} = useContext(DataContext);

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
    added.map(item => (item === i ? count++ : null));
    return count;
  };

  const removeElement = item => {
    let index = added.lastIndexOf(item);
    setAdded(
      added.slice(0, index).concat(added.slice(index + 1, added.length)),
    );
    AsyncStorage.setItem('added', JSON.stringify(added.slice(0, index).concat(added.slice(index + 1, added.length))));
  };

  return (
    <>
      {data
        ?.filter(i => added.includes(i.id))
        ?.map(item => (
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={{fontSize: 20}} numberOfLines={1}>
                {item?.title}
              </Text>
              <Text style={{fontSize: 12}} numberOfLines={2}>
                {item?.description}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 10,
                }}>{`$ ${item?.price}`}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: item?.thumbnail}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.content}>
                <View style={styles.button2}>
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
                    style={styles.buttonText}
                    onPress={() => {
                      setAdded(current => [...current, item?.id]);
                      AsyncStorage.setItem('added', JSON.stringify([...added, item?.id]));
                    }}>
                    +
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
    </>
  );
};

export default CartItemCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 120,
    marginVertical: 5,
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: '#fffdee',
  },
  infoContainer: {
    width: '70%',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  content: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    bottom: 8,
    left: 5,
  },
  button1: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 7,
  },
  button2: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    right: 3,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  imageContainer: {
    borderWidth: 0.2,
    borderRadius: 15,
    alignSelf: 'flex-end',
    top: 5,
  },
  image: {width: 90, height: 80, borderRadius: 15},
});
