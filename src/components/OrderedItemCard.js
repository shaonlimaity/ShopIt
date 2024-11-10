/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderedItemCard = ({ordered, navigation}) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.statusContainer}>
        {moment
          .duration(moment(new Date()).diff(ordered[0]?.date))
          .asMinutes() > 10 ? (
          <Text style={styles.status}>DELIVERED</Text>
        ) : (
          <Text style={styles.status}>PROCESSING</Text>
        )}
        <View>
          <Text>{moment(ordered[0]?.date).format('LL')}</Text>
          <Text style={{textAlign: 'right'}}>
            {moment(ordered[0]?.date).fromNow()}{' '}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{height: 120}}>
          {ordered?.map(orders => (
            <>
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
                    style={styles.count}>
                    {orders?.count}
                  </Text>
                </View>
                <Text style={styles.title} numberOfLines={1}>
                  {orders?.product?.title}
                </Text>
              </View>
            </>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrdersSummary', ordered)}
          style={styles.icon}>
          <Ionicons name={'chevron-forward'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderedItemCard;

const styles = StyleSheet.create({
  orderContainer: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
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
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: -5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 5,
  },
  icon: {
    justifyContent: 'center',
    paddingHorizontal: 3,
    backgroundColor: '#FFA500',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {fontSize: 12, textAlign: 'center', bottom: 7},
  count: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
