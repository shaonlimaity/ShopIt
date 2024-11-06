import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import {StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CartScreen from '../screens/CartScreen';
import { DataContext } from '../global/DataContext';

const Tab = createBottomTabNavigator();

function TabNavigator({}) {
  const {added} = useContext(DataContext);
  return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'bag-handle' : 'bag-handle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            return (
              <>
                <Ionicons style={{ bottom: route.name === 'Cart' && added?.length > 0 && -10}} name={`${iconName}`} size={28} color={color} />
                {route.name === 'Cart' && added?.length > 0 && <Text style={styles.cartMarker}>{added?.length}</Text>}
              </>
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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
  cartMarker: {
    zIndex: 10,
    color: 'red',
    left: 20,
    bottom: 25,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
