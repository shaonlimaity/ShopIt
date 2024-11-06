import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {DataContext} from '../global/DataContext';

const OrdersSummary = ({navigation, route}) => {
  const {ordered} = useContext(DataContext);
  var total;
  const {params} = route;

  console.log(route.key);

  const totalPrice = () => {
    // console.log(arr);
    total = 0;
    // arr?.map(n => {
    //     console.log(n);
    // //   total += n?.product.price * n?.count;
    // });
    params?.map(item => (total += item?.product?.price * item?.count));
    return Math.round(total * 100) / 100;
  };

  const grandTotal = () => {
    let grand = (totalPrice(ordered) * 5) / 100 + totalPrice(ordered) + 5;
    return Math.round(grand * 100) / 100;
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
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
            <Text style={{fontSize: 15}} numberOfLines={2}>
              {item?.product?.description}
            </Text>
            <View style={styles.priceInfo}>
                <Text style={styles.price}>{`$ ${item?.product?.price}`} x {`${item?.count}`}</Text>
                <Text style={styles.price}>$ {item?.product?.price * item?.count}</Text>
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
          <Text style={[styles.summary, {fontSize: 16, fontWeight: 'bold'}]}>
            Grand Total
          </Text>
          <Text style={[styles.summary, {fontSize: 16, fontWeight: 'bold', color: 'green'}]}>
            ${grandTotal()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    marginVertical: 5,
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: '#fffdee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '90%',
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
});
