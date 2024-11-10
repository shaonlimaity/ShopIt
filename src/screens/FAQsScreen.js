import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FAQsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`Q. What kind of App is this?
        \nA. This is an ecommerce mobile app.`}
      </Text>
    </View>
  );
};

export default FAQsScreen;

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
