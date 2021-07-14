import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { inject, observer } from 'mobx-react';
import strings from '../translations';

const LoginScreen = ({ navigation, usersStore }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    };

    const onLoginPress = async () => {
        try {
            const res = await usersStore.login(email, password);
            if (!res.success) alert(res.error);
        } catch (e) {
            console.log('LOGIN SCREEN TRY/CATCH ERROR: ', e);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder={strings.email}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder={strings.password}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>{strings.login}</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        {strings.noAcc}{' '}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            {strings.signUp}
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {},
    logo: {
        flex: 1,
        height: 250,
        width: 250,
        alignSelf: 'center',
        margin: 30,
        marginBottom: -20
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: '#00BCD4',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d',
    },
    footerLink: {
        color: '#00BCD4',
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default inject(({ usersStore }) => ({ usersStore }))(observer(LoginScreen));
