/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { DataContext } from '../global/DataContext';

const ProductDetailsScreen = ({route}) =>{
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

    const {params} = route;
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={{uri: params?.thumbnail }} style={{ height: 200}} />
            </View>
            <Text style={styles.productName}>{params?.title}</Text>
            <Text style={styles.productDesc}>{params?.description}</Text>
            <Text style={styles.rating}>★  {params?.rating} </Text>
            <Text style={styles.price}>{`Price: $ ${params?.price}`}</Text>

            <Text style={styles.productInfoHeading}>Product Informations</Text>
            <Text style={styles.productInfo}>{`Weight: ${params?.weight} kg`}</Text>
            <Text style={styles.productInfo}>{`Availability: ${params?.availabilityStatus}`}</Text>
            <Text style={styles.productInfo}>{'Dimensions (in cm): '}</Text>
            <Text style={styles.productSubInfo}>{`Width: ${params?.dimensions?.width}`}</Text>
            <Text style={styles.productSubInfo}>{`Height: ${params?.dimensions?.height}`}</Text>
            <Text style={styles.productSubInfo}>{`Depth: ${params?.dimensions?.depth}`}</Text>
            <Text style={styles.productInfo}>{`Shipping: ${params?.shippingInformation}`}</Text>
            <View style={styles.buttonContainer}>
            {checkCount(params?.id) === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setAdded(current => [...current, params?.id]);
                }}
                style={[styles.button, {backgroundColor: params?.availabilityStatus === 'In Stock' ? 'green' : 'grey'}]}
              >
                <Text style={styles.buttonText}>{params?.availabilityStatus === 'In Stock' ? 'Add to Cart' : 'Out of Stock'}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.button2}>
                <Text style={styles.buttonText} onPress={() => {
                  if (checkCount(params?.id) >= 1) {
                    removeElement(params?.id);
                  }
                }}>-</Text>
                <Text style={[styles.buttonText, {marginHorizontal: 7}]}>{checkCount(params?.id)}</Text>
                <Text style={styles.buttonText} onPress={() => setAdded(current => [...current, params?.id])}>+</Text>
              </View>
            )}
            </View>
        </View>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    image: {
        width: '100%',
        height: 200,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    productName: {
        textAlign:'left',
        fontSize: 25,
        fontWeight: 'bold',
    },
    productDesc: {
        textAlign:'left',
        fontSize: 14,
        marginTop: 15,
    },
    price: {
        textAlign:'left',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 15,
    },
    productInfoHeading: {
        textAlign:'left',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
    },
    productInfo: {
        textAlign:'left',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 15,
        marginLeft: 10,
    },
    productSubInfo: {
        textAlign:'left',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 50,
    },
    rating: {
        textAlign:'left',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15,
        color: 'green',
    },
    buttonContainer: {
        flex:1,
        marginBottom: 35,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 45,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button2: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        backgroundColor: 'green',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 25,
    },
});
