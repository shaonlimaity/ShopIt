import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ItemCards from '../components/ItemCards';
// import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      'https://dummyjson.com/products/category/groceries',
    );
    const datas = await response.json();
    // console.log('Data', datas);
    setData(datas.products);
  };

  const renderItem = ({item}) => {
    return <ItemCards product={item} />;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#eeeeff'}}>
      <FlatList contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', marginTop: 20}} data={data} renderItem={renderItem} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    backgroundColor: 'yellow',
  },
});
