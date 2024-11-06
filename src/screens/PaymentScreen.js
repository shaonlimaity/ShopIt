import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const API_URL = Platform.OS === 'ios' ? 'http://localhost:4242' : 'http://10.0.2.2:4567';
const PaymentScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CardPay')} style={styles.button}>
        <Text style={styles.text}>
          Card Payment
        </Text>
        <Ionicons style={styles.icon} name={'chevron-forward'} size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PlatformPay')} style={styles.button}>
        {Platform.OS === 'ios' ? (
          <Text
            style={styles.text}>
            Apple Pay
          </Text>
        ) : (
          <Text
            style={styles.text}>
            Gpay Pay
          </Text>
        )}
        <Ionicons style={styles.icon} name={'chevron-forward'} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 70,
    marginTop: 20,
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#dc4d01',
  },
  icon: {marginTop: 14},
});
