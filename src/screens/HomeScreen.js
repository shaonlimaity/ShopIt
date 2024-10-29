import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ItemCards from '../components/ItemCards';
import { DataContext } from '../global/DataContext';

const HomeScreen = () => {
  const {data, setData, added} = useContext(DataContext);

  useEffect(() => {
    fetch(
      'https://dummyjson.com/products/category/groceries',
    )
      .then(res => res.json())
      .then(response => setData(response?.products));
  }, [added, data, setData]);

  const renderItem = ({item}) => {
    return <ItemCards product={item} />;
  };
  return (
    <View style={styles.container}>
      <View>
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
});
