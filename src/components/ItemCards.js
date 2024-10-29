/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ItemCards = ({product}) => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={{borderWidth: 0.2, borderRadius: 15}}>
        <Image
          source={{uri: product?.thumbnail}}
          style={{width: 140, height: 130, borderRadius: 15}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
        }}>
        <View>
          <Text>{product?.title}</Text>
          <Text>{`$ ${product?.price}`}</Text>
        </View>
        {count === 0 ? (
          <TouchableOpacity
            onPress={() => {
              setCount(prevCount => prevCount + 1);
            }}
            style={{
              paddingHorizontal: 8,
              paddingVertical: 5,
              backgroundColor: 'green',
              borderRadius: 7,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 8,
              paddingVertical: 5,
              backgroundColor: 'green',
              borderRadius: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}} onPress={() => setCount(prevCount => prevCount - 1)}>-</Text>
            <Text style={{color: 'white', fontWeight: 'bold', marginHorizontal: 7}}>{count}</Text>
            <Text style={{color: 'white', fontWeight: 'bold'}} onPress={() => setCount(prevCount => prevCount + 1)}>+</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ItemCards;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
});
