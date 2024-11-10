/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import ItemCards from '../components/ItemCards';
import {DataContext} from '../global/DataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation, route}) => {
  const {data, setData, added, setAdded} = useContext(DataContext);
  const [input, setInput] = useState(null);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    (async () => {
      const data1 = (await AsyncStorage.getItem('data')) || '';
      setData(JSON.parse(data1));
      const added1 = (await AsyncStorage.getItem('added')) || '';
      setAdded(JSON.parse(added1));
    })();
  }, [setData, setAdded]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/groceries')
      .then(res => res.json())
      .then(response => {
        setData(response?.products);
        AsyncStorage.setItem('data', JSON.stringify(response?.products));
      });
  }, [added, data, setData]);

  const renderItem = ({item}) => {
    return <ItemCards product={item} navigation={navigation} route={route} />;
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>ShopIt</Text>
            <Text style={styles.headerSubText}>
              From the comfort of your home
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={styles.accountIcon}>
            <Ionicons name={'person'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons
            name={'search-sharp'}
            size={20}
            color={'black'}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder={'Search for a specific item'}
            onChangeText={text => {
              setInput(text);
              setSearch(data.filter(i => i.title.includes(text.toLowerCase())));
            }}
            value={input}
          />
        </View>
        <View style={{paddingBottom: Platform?.OS === 'ios' ? 350 : 320}}>
          {!input ? (
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={data}
              renderItem={renderItem}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={search}
              renderItem={renderItem}
            />
          )}
        </View>
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
    paddingTop: Platform?.OS === 'ios' ? 60 : 30,
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
  icon: {marginHorizontal: 5},
  searchContainer: {
    borderWidth: 3,
    borderColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF80',
    padding: 5,
    paddingLeft: 10,
  },
});
