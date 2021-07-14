/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Provider } from 'mobx-react';
import { ItemsStore, UsersStore } from './store';
import 'react-native-gesture-handler';
import React from 'react';
import App from './App';

const AppContainer = () => {
    return (
        <Provider itemsStore={new ItemsStore()} usersStore={new UsersStore()}>
            <App />
        </Provider>
    );
};

export default AppContainer;
