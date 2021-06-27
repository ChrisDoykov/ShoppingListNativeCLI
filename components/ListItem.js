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
          style={styles.icon}
          onPress={() => itemsStore.deleteItem(item.id)}
          size={20}
          color={'#d62d2d'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    paddingLeft: 10,
    backgroundColor: '#f3f0ef',
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginTop: 5,
    borderColor: '#75eefe',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  icon: {
    padding: 5,
  },
});

export default inject(({itemsStore}) => ({itemsStore}))(observer(ListItem));
