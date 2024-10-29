/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrdersScreen from './src/screens/OrdersScreen';
import AccountScreen from './src/screens/AccountScreen';
import CartScreen from './src/screens/CartScreen';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        setShowSplash(true);
      }, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4000);
  }, []);

  return (
    <View style={{flex: 1}}>
      {showSplash && <SplashScreen />}
      {!showSplash && <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Ionicons name={`${iconName}`} size={size} color={color} />;
          },
          tabBarStyle: styles.tabBarAndroid,
          tabBarActiveTintColor: '#FB2299',
          tabBarInactiveTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'white',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>}
    </View>
  );
}

const styles = StyleSheet.create({
  tabScreenHeader: {
    backgroundColor: '#556E78',
    borderWidth: 1,
  },
  tabBarAndroid: {
    backgroundColor: 'orange',
    paddingTop: 16,
    paddingBottom: 17,
    height: 90,
  },
});

export default App;
