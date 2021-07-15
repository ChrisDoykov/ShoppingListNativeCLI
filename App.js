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
import AwesomeAlert from 'react-native-awesome-alerts';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

const App = ({ usersStore, alertsStore }) => {

  useEffect(() => {
    usersStore.onAuthStateChanged();
  }, []);

  const user = usersStore.user;
  const loading = usersStore.loading;

  const alertSettings = alertsStore.settings;
  const alertShown = alertsStore.shown;

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
        <AwesomeAlert
          show={alertShown}
          showProgress={alertSettings.showProgress}
          title={alertSettings.title}
          message={alertSettings.message}
          closeOnTouchOutside={alertSettings.closeOnTouchOutside}
          closeOnHardwareBackPress={alertSettings.closeOnHardwareBackPress}
          showCancelButton={alertSettings.showCancelButton}
          showConfirmButton={alertSettings.showConfirmButton}
          cancelText={alertSettings.cancelText}
          confirmText={alertSettings.confirmText}
          confirmButtonColor={alertSettings.confirmButtonColor}
          onCancelPressed={alertSettings.onCancelPressed}
          onConfirmPressed={alertSettings.onConfirmPressed}
        />
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

export default inject(({ usersStore, alertsStore }) => ({ usersStore, alertsStore }))(observer(App));
