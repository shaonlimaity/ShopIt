import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.image}
        resizeMode={'stretch'}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
});
