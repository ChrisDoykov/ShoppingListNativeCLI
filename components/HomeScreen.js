import React from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import Header from './Header';
import AddItem from './AddItem';
import Items from './Items';
import Footer from './Footer';
import strings from '../translations';

const HomeScreen = ({ usersStore }) => {

    const { fullName } = usersStore.user;

    return (
        <View style={styles.container}>
            <Header title={strings.getLanguage() === 'en' ? `${fullName}'s Shopping List` : `Списъкът на ${fullName}`} />
            <AddItem />
            <Items />
            <Footer />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'white',
    }
});

export default inject(({ usersStore, itemsStore }) => ({ usersStore, itemsStore }))(
    observer(HomeScreen),
);
