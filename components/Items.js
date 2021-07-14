import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import ListItem from './ListItem';
import { inject, observer } from 'mobx-react';
import strings from '../translations';

const Items = ({ itemsStore, usersStore }) => {
  const userId = usersStore.user ? usersStore.user.id : '';

  useEffect(() => {
    itemsStore.setUserId(userId);
    itemsStore.getItems();
  }, []);

  let loading = itemsStore.loading;
  let items = itemsStore.items;


  return (
    <View style={styles.container}>
      {!loading ? (
        items.length > 0 ?
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ListItem item={item} itemsStore={itemsStore} key={item.id} />
            )}
          /> : <Text style={styles.empty}>{strings.allForNow}</Text>
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
  empty: {
    fontSize: 24,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#A9A9A9'
  }
});

export default inject(({ itemsStore, usersStore }) => ({ itemsStore, usersStore }))(observer(Items));
