import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {inject, observer} from 'mobx-react';

const ListItem = ({item, itemsStore}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.text}</Text>
        <Icon
          name="remove"
          onPress={() => itemsStore.deleteItem(item.id)}
          size={20}
          color={'firebrick'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
});

export default inject(({itemsStore}) => ({itemsStore}))(observer(ListItem));
