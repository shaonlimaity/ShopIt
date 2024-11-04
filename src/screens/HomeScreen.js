import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import ItemCards from '../components/ItemCards';
import {DataContext} from '../global/DataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation, route}) => {
  const {data, setData, added} = useContext(DataContext);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/groceries')
      .then(res => res.json())
      .then(response => setData(response?.products));
  }, [added, data, setData]);

  const renderItem = ({item}) => {
    return <ItemCards product={item} navigation={navigation} route={route} />;
  };
  return (
    <View style={styles.container}>
      <View>
        <View
          style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>
              ShopIt
            </Text>
            <Text
              style={styles.headerSubText}>
              from the comfort of your home
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={styles.accountIcon}>
            <Ionicons name={'person'} size={25} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#eeeeff'},
  listContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  headerContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 25,
  },
  headerText: {fontSize: 30, fontWeight: 'bold', color: 'white'},
  headerSubText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  accountIcon: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
