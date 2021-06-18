import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import Header from './components/Header';
import AddItem from './components/AddItem';
import {inject, observer, Provider} from 'mobx-react';
import ItemsStore from './store';
import Items from './components/Items';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const App = () => {
  return (
    <Provider itemsStore={new ItemsStore()}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header />
          <AddItem />
          <Items />
          <View>
            <Text style={styles.footNote}>
              Kristiyan Doykov{' '}
              <Icon style={styles.copyright} name={'copyright'} size={20} />{' '}
              2021
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  addField: {
    marginBottom: 10,
  },
  addFieldLoading: {
    marginBottom: 60,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#272C36',
  },
  footNote: {
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#00BCD4',
    paddingBottom: 13,
  },
  copyright: {
    color: '#8C43FF',
  },
});

export default inject(({itemsStore}) => ({itemsStore}))(observer(App));
