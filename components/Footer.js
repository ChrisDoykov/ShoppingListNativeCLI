import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function Footer() {
  return (
    <View>
      <Text style={styles.footNote}>
        Kristiyan Doykov{' '}
        <Icon style={styles.copyright} name={'copyright'} size={20} />{' '}
        {new Date().getFullYear()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footNote: {
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#00BCD4',
    paddingBottom: 13,
    paddingTop: 13,
  },
  copyright: {
    color: '#8C43FF',
  },
});
