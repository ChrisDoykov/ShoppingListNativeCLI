import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Header from './components/Header';
import AddItem from './components/AddItem';
import {inject, observer, Provider} from 'mobx-react';
import ItemsStore from './store';
import Items from './components/Items';

const App = () => {
  return (
    <Provider itemsStore={new ItemsStore()}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Header />
          <AddItem />
          <Items />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
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
});

export default inject(({itemsStore}) => ({itemsStore}))(observer(App));
