import React from 'react';
import {ImageBackground, View, SafeAreaView, Image, Text} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode={'stretch'}
      />
    </View>
  );
};

export default SplashScreen;
