/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrdersScreen from './src/screens/OrdersScreen';
import AccountScreen from './src/screens/AccountScreen';
import CartScreen from './src/screens/CartScreen';
import { DataProvider } from './src/global/DataContext';

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
    <View style={styles.container}>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <DataProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({focused, color}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Orders') {
                  iconName = focused ? 'bag-handle' : 'bag-handle-outline';
                } else if (route.name === 'Account') {
                  iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Cart') {
                  iconName = focused ? 'cart' : 'cart-outline';
                }

                return (
                  <Ionicons name={`${iconName}`} size={28} color={color} />
                );
              },
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: '#ff0101',
              tabBarInactiveTintColor: '#FFFFFF',
              headerStyle: {
                backgroundColor: 'orange',
              },
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
              },
              headerTintColor: 'white',
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
              },
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        </DataProvider>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  tabScreenHeader: {
    backgroundColor: '#556E78',
    borderWidth: 1,
  },
  tabBar: {
    backgroundColor: 'orange',
    paddingTop: 10,
    paddingBottom: 20,
    height: 90,
  },
});

export default App;
