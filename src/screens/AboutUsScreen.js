import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`An ecommerce mobile application developed as part of a training process.
        \nThis app doesn't have a backend integrated.`}
      </Text>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
