import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import 'react-native-gesture-handler';
import { decode, encode } from 'base-64';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

const App = ({ usersStore }) => {

  useEffect(() => {
    usersStore.onAuthStateChanged();
  }, []);

  const user = usersStore.user;
  const loading = usersStore.loading;

  return (
    loading ? (
      <View style={styles.containerLoading}>
        <ActivityIndicator size={'large'} color="#00BCD4" />
      </View>
    ) :
      (<SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator >
            {user ? (
              <Stack.Screen options={{
                headerShown: false
              }} name="Home" component={HomeScreen} />
            ) : (
              <>
                <Stack.Screen
                  options={{
                    headerShown: false
                  }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen options={{
                  headerShown: false
                }} name="Registration" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      ));
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
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

export default inject(({ usersStore }) => ({ usersStore }))(observer(App));
