import React, {useState} from 'react';
import {inject} from 'mobx-react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddItem = ({style, itemsStore}) => {
  const [text, setText] = useState('');

  const addItem = async text => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{text: 'Ok'}]);
    } else {
      itemsStore.addItem(text);
      setText('');
    }
  };

  return (
    <View style={style}>
      <TextInput
        placeholder="Item name..."
        placeholderTextColor="black"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addItem(text);
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
          &nbsp; Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 2,
    marginHorizontal: 5,
  },
  btn: {
    backgroundColor: '#c5f8ff',
    padding: 9,
    margin: 5,
    marginBottom: 10,
  },
  btnText: {
    color: '#00BCD4',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default inject(({itemsStore}) => ({itemsStore}))(AddItem);
