import React, {useEffect} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import ListItem from './ListItem';
import {inject, observer} from 'mobx-react';

const Items = ({itemsStore}) => {
  useEffect(() => {
    itemsStore.getItems();
  }, []);

  let loading = itemsStore.loading;
  return !loading ? (
    <FlatList
      data={itemsStore.items}
      renderItem={({item}) => (
        <ListItem item={item} itemsStore={itemsStore} key={item.id} />
      )}
    />
  ) : (
    <ActivityIndicator size="large" color="#fafafa" />
  );
};

export default inject(({itemsStore}) => ({itemsStore}))(observer(Items));
