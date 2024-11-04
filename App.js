/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import { DataProvider } from './src/global/DataContext';
import StackNavigator from './src/navigations/StackNavigation';

function App() {
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
          <StackNavigator />
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
