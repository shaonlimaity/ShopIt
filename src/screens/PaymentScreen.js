import {PlatformPay, PlatformPayButton, StripeProvider, usePlatformPay} from '@stripe/stripe-react-native';
import React from 'react';
import { Alert, View } from 'react-native';

const API_URL = 'http://10.0.2.2:3000';
const PaymentScreen = () => {
  const {
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = usePlatformPay();

  React.useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
        // Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, [isPlatformPaySupported]);

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
    const { client_secret } = await response.json();

    return client_secret;
  };

  const pay = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {
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
      }
    );

    if (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
  };

  return (
    <StripeProvider
        publishableKey="pk_test_51QGbyZGTpt0YW21e5PhPR7TOYdIs10YBtf7YQUyN8H5lkx9MZ1tkXSZ48cdcnf1qvFf8Ct2X5TzbOq0w001kAa4Z00xaTRceO6"
    >
      <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 20}}>
        <PlatformPayButton
          type={PlatformPay.ButtonType.AddMoney}
          onPress={pay}
          style={{
            width: '100%',
            height: 50,
          }}
        />
      </View>
    </StripeProvider>
  );
};

export default PaymentScreen;
