import React, {useContext, useState} from 'react';
import {View, Text, Button, Platform, StyleSheet, Alert} from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {DataContext} from '../global/DataContext';

function CardPayScreen({navigation}) {
  const {data, added, setData, setAdded, setOrdered} = useContext(DataContext);
  const [complete, setComplete] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    const apiEndpoint =
      Platform.OS === 'ios' ? 'http://localhost:4242' : 'http://10.0.2.2:4567';

    const response = await fetch(`${apiEndpoint}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  const checkCount = i => {
    let count = 0;
    added?.map(item => (item === i ? count++ : null));
    return count;
  };

  const orders = () => {
    const order = [];
    data?.forEach(item => {
      if (added?.includes(item.id)) {
        const orderItem = {
          product: item,
          count: checkCount(item.id),
          date: new Date(),
        };
        order.push(orderItem);
      }
    });
    return order;
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.cardStyle}
        style={styles.cardField}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
          setComplete(cardDetails?.complete);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button
        onPress={() => {
          //   handlePayPress();
          if (complete) {
            setOrdered(current => [...current, orders()]);
            setAdded([]);
            setData([]);
            Alert.alert('Success', 'The payment was confirmed successfully.');
          } else {
            Alert.alert('Failed', 'Complete Card Details.');
          }
        }}
        title="Pay"
        disabled={loading}
      />
      <Text onPress={() => navigation.navigate('Orders')} style={styles.text}>
          View Orders
        </Text>
    </View>
  );
}

export default CardPayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    color: '#FF6500',
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
});
