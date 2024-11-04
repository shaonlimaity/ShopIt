/* eslint-disable react-native/no-inline-styles */

import React, {useContext} from 'react';
import {DataContext} from '../global/DataContext';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ItemCards = ({product, navigation}) => {
  const {added, setAdded} = useContext(DataContext);

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
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetails', product)}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product?.thumbnail}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View
        style={styles.content}>
        <View style={{width: '68%'}}>
          <Text numberOfLines={1}>{product?.title}</Text>
          <Text>{`$ ${product?.price}`}</Text>
        </View>
        {checkCount(product?.id) === 0 ? (
          <TouchableOpacity
            onPress={() => {
              setAdded(current => [...current, product?.id]);
            }}
            style={styles.button1}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={styles.button2}>
            <Text style={styles.buttonText} onPress={() => {
                if (checkCount(product?.id) >= 1) {
                  removeElement(product?.id);
                }
              }}>-</Text>
            <Text style={[styles.buttonText, {marginHorizontal: 7}]}>{checkCount(product?.id)}</Text>
            <Text style={styles.buttonText} onPress={() => setAdded(current => [...current, product?.id])}>+</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ItemCards;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 170,
    height: 200,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: '#fffde9',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  button1: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 7,
  },
  button2: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  imageContainer: {borderWidth: 0.2, borderRadius: 15},
  image: {width: 140, height: 130, borderRadius: 15},
});
