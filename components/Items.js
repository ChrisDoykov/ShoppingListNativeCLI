import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import {inject, observer} from 'mobx-react';

const Items = ({itemsStore}) => {
  useEffect(() => {
    itemsStore.getItems();
  }, []);

  let loading = itemsStore.loading;
  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          data={itemsStore.items}
          renderItem={({item}) => (
            <ListItem item={item} itemsStore={itemsStore} key={item.id} />
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#00BCD4" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default inject(({itemsStore}) => ({itemsStore}))(observer(Items));
