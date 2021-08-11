import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { inject, observer } from 'mobx-react';
import strings from "../translations";

const ListItem = ({ item, itemsStore }) => {

  const [newText, setnewText] = useState("");
  const [editing, setEditing] = useState(false);

  const edit = () => {
    setEditing(false);
    itemsStore.updateItem(item.id, newText);
  };

  return (
    <TouchableOpacity style={editing ? styles.listItemEditing : styles.listItem}>
      <View style={styles.listItemView}>
        {editing ? <TextInput
          autoFocus={true}
          placeholderTextColor="black"
          value={newText}
          onChangeText={setnewText}
          style={styles.input}
        /> : <Text style={styles.listItemText}>{item.text}</Text>}
        <View style={styles.icons}>
          {editing ? <Icon
            name="check"
            style={styles.iconCheck}
            onPress={() => edit()}
            size={20}
            color={'green'}
          /> : <>
            <Icon
              name="pencil"
              style={styles.iconEdit}
              onPress={() => {
                setnewText(item.text);
                setEditing(true);
              }
              }
              size={20}
              color={'#80461b'}
            />
            <Icon
              name="remove"
              style={styles.iconRemove}
              onPress={() => itemsStore.deleteItem(item.id)}
              size={20}
              color={'#d62d2d'}
            />
          </>}
        </View>
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
  listItemEditing: {
    paddingRight: 10,
    paddingLeft: 0,
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
    maxWidth: '75%',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  iconRemove: {
    padding: 5,
    marginLeft: 13
  },
  iconEdit: {
    padding: 5,
  },
  iconCheck: {
    padding: 5,
  },
  input: {
    minWidth: '50%',
    maxWidth: '87.5%',
    fontSize: 18,
    padding: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: '#75eefe',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 3,
    color: 'black'
  }
});

export default inject(({ itemsStore }) => ({ itemsStore }))(observer(ListItem));
