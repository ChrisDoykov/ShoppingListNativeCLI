import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import strings from '../translations';

function Header({ title, usersStore }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => usersStore.logout()}>
        <Icon name="logout" style={styles.icon} size={25} />
      </TouchableOpacity>
    </View>
  );
}

Header.defaultProps = {
  title: strings.shoppingList,
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingVertical: 0,
    display: 'flex',
    backgroundColor: '#00BCD4',
    position: 'relative'
  },
  text: {
    color: 'white',
    fontSize: 21,
    marginRight: 20,
    paddingTop: 15,
    textAlign: 'center',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 17.5,
    right: 15
    // transform: [translateY(-50)]
    // paddingBottom: 30
  },
  icon: {
    color: 'white'
    , paddingBottom: 30
  }
});



export default inject(({ usersStore }) => ({ usersStore }))(observer(Header));