import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

function TabNavigator({}) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            // let iconName;

            // if (route.name === 'Home') {
            //   iconName = focused ? 'home' : 'home-outline';
            // } else if (route.name === 'Others') {
            //   iconName = focused ? 'heart' : 'heart-outline';
            // } else if (route.name === 'Search') {
            //   iconName = focused ? 'heart' : 'heart-outline';
            // } else if (route.name === 'Chat') {
            //   iconName = focused ? 'heart' : 'heart-outline';
            // } else if (route.name === 'Camera') {
            //   iconName = focused ? 'heart' : 'heart-outline';
            // }

            // You can return any component that you like here!
            // return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: styles.tabBarAndroid,
          tabBarActiveTintColor: '#FBB500',
          tabBarInactiveTintColor: '#FFFFFF',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
            headerStyle: styles.tabScreenHeader,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: styles.tabScreenHeader,
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: styles.tabScreenHeader,
          }}
        />
      </Tab.Navigator>
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

export default TabNavigator;
