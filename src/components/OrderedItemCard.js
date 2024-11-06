/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderedItemCard = ({ordered, navigation}) => {
  return (
    <>
      {ordered?.map(item => (
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{height: 120}}>
            {item?.map(orders => (
              <>
                {/* <Text>{orders?.date}</Text> */}
                <View style={{justifyContent: 'center', paddingHorizontal: 5}}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: orders?.product?.thumbnail}}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.number}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {orders?.count}
                    </Text>
                  </View>
                  <Text
                    style={{fontSize: 12, textAlign: 'center', bottom: 7}}
                    numberOfLines={1}>
                    {orders?.product?.title}
                  </Text>
                </View>
              </>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrdersSummary', item)}
            style={{
              justifyContent: 'center',
              paddingHorizontal: 3,
              backgroundColor: '#FFA500',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Ionicons name={'chevron-forward'} size={25} />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default OrderedItemCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    marginVertical: 10,
    borderWidth: 0.3,
    borderRadius: 10,
    backgroundColor: '#fffdee',
    paddingLeft: 5,
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
    marginBottom: 5,
    bottom: -8,
  },
  image: {width: 90, height: 80, borderRadius: 15},
  number: {
    alignSelf: 'flex-end',
    width: 15,
    height: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    bottom: 10,
    left: 5,
    zIndex: 20,
    backgroundColor: 'white',
  },
});
