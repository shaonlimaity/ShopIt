import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import TabNavigator from './TabNavigation';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';

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
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
