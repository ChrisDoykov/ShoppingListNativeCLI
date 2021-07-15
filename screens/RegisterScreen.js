import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { inject, observer } from 'mobx-react';
import strings from '../translations';

const RegisterScreen = ({ navigation, usersStore, alertsStore }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alertsStore.updateSettings({
                title: strings.wentWrong,
                message: strings.passwordsDontMatch,
                showConfirmButton: false
            });
            alertsStore.showAlert();
            return;
        }
        const res = await usersStore.register(email, password, fullName);

        if (!res.success) {
            let message;
            if (res.error.message.includes('password is invalid')) {
                message = strings.wrongPass;
            } else if (res.error.message.includes('email address is badly formatted')) {
                message = strings.badEmail;
            } else {
                message = strings.genericErr;
            }

            alertsStore.updateSettings({
                title: strings.wentWrong,
                message,
                showConfirmButton: false
            });
            alertsStore.showAlert();
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
                    placeholder={strings.name}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder={strings.email}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    textContentType="emailAddress"
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder={strings.confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>{strings.createAcc}</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        {strings.alreadyHaveAcc}{' '}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            {strings.login}
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


export default inject(({ usersStore, alertsStore }) => ({ usersStore, alertsStore }))(
    observer(RegisterScreen),
);
