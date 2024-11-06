import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import TabNavigator from './TabNavigation';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import FAQsScreen from '../screens/FAQsScreen';
import OrdersSummary from '../screens/OrdersSummary';
import CardPayScreen from '../screens/CardPayment';
import PlatformPayScreen from '../screens/PlatformPay';

const Stack = createStackNavigator();

function StackNavigator({}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
            headerStyle: styles.tabScreenHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Product Details',
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
        />
        <Stack.Screen
          name="PlatformPay"
          component={PlatformPayScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CardPay"
          component={CardPayScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrdersSummary"
          component={OrdersSummary}
          options={{
            title: 'Orders Summary',
          }}
        />
         <Stack.Screen
          name="Account"
          component={AccountScreen}
        />
         <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Order"
          component={OrdersScreen}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
        />
        <Stack.Screen
          name="FAQs"
          component={FAQsScreen}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            title: ' ',
            headerTitleAlign: 'center',
            headerStyle: styles.tabScreenHeader,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabScreenHeader: {
    backgroundColor: '#556E78',
    borderWidth: 1,
  },
  tabBarAndroid: {
    backgroundColor: '#556E78',
    paddingTop: 16,
    paddingBottom: 12,
    height: 70,
  },
});

export default StackNavigator;
