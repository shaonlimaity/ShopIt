/* eslint-disable no-unused-vars */
import {
  PlatformPay,
  PlatformPayButton,
  StripeProvider,
  usePlatformPay,
} from '@stripe/stripe-react-native';
import React, {useContext, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, Platform} from 'react-native';
import {DataContext} from '../global/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:4242' : 'http://10.0.2.2:4567';
const PlatformPayScreen = ({navigation}) => {
  const {data, added, ordered, setData, setAdded, setOrdered} =
    useContext(DataContext);
  const {
    // isPlatformPaySupported,
    // PaymentConfiguration,
    confirmPlatformPayPayment,
  } = usePlatformPay();

  // useEffect(() => {
  //   PaymentConfiguration.init();
  // },[PaymentConfiguration]);

  useEffect(() => {
    (async () => {
      const data1 = (await AsyncStorage.getItem('data')) || '';
      setData(JSON.parse(data1));
      const added1 = (await AsyncStorage.getItem('added')) || '';
      setAdded(JSON.parse(added1));
    })();
  }, [setAdded, setData]);

  // React.useEffect(() => {
  //   (async function () {
  //     if (!(await isPlatformPaySupported({googlePay: {testEnv: true}}))) {
  //       Alert.alert('Google Pay is not supported.');
  //       return;
  //     }
  //   })();
  // }, [isPlatformPaySupported]);

  const fetchPaymentIntentClientSecret = async () => {
    // Fetch payment intent created on the server, see above
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {client_secret} = await response.json();
    return client_secret;
  };

  // ********** actual payment code but isn't functional as backend not integrated *********** //

  const pay = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error} = await confirmPlatformPayPayment(clientSecret, {
      googlePay: {
        testEnv: true,
        merchantName: 'My merchant name',
        merchantCountryCode: 'US',
        currencyCode: 'USD',
        billingAddressConfig: {
          format: PlatformPay.BillingAddressFormat.Full,
          isPhoneNumberRequired: true,
          isRequired: true,
        },
      },
    });
    if (error) {
      Alert.alert(error.code, error.message); // actual code but as backend is not integrated it won't work
      console.log(error.code, error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    setOrdered(current => [added, ...current]);
    AsyncStorage.setItem('ordered', JSON.stringify([orders(), ...ordered]));
    // Alert.alert('Success', 'The payment was confirmed successfully.');
    var r = Alert.confirm('Success', 'The payment was confirmed successfully.');
    console.log(r);
    if (r === true) {
      navigation.navigate('Orders');
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
    <StripeProvider publishableKey="pk_test_51QGbyZGTpt0YW21e5PhPR7TOYdIs10YBtf7YQUyN8H5lkx9MZ1tkXSZ48cdcnf1qvFf8Ct2X5TzbOq0w001kAa4Z00xaTRceO6">
      <View style={styles.container}>
        <PlatformPayButton
          type={PlatformPay.ButtonType.AddMoney}
          onPress={() => {
            // pay();  // ********* actual payment code but isn't functional as backend not integrated ********* //
            setOrdered(current => [orders(), ...current]);
            AsyncStorage.setItem(
              'ordered',
              JSON.stringify([orders(), ...ordered]),
            );
            setAdded([]);
            AsyncStorage.setItem('added', JSON.stringify([]));
            setData([]);
            AsyncStorage.setItem('data', JSON.stringify([]));
            Alert.alert('Success', 'The payment was confirmed successfully.', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Orders'),
              },
            ]);
          }}
          style={styles.button}
        />
        <Text onPress={() => navigation.navigate('Orders')} style={styles.text}>
          View Orders
        </Text>
      </View>
    </StripeProvider>
  );
};

export default PlatformPayScreen;

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
});
