import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
    en: {
        email: 'E-mail',
        password: 'Password',
        noAcc: "Don't have an account?",
        signUp: 'Sign up',
        login: 'Log in',
        passwordsDontMatch: "Passwords don't match.",
        name: 'First Name',
        confirmPassword: 'Confirm Password',
        createAcc: 'Create account',
        alreadyHaveAcc: 'Already got an account?',
        shoppingList: 'Shopping List',
        enterItem: 'Please enter an item.',
        itemName: 'Item name',
        addItem: 'Add Item',
        allForNow: "Looks like that's all for now :)"
    },
    bg: {
        email: 'Имейл',
        password: 'Парола',
        noAcc: "Нямате профил?",
        signUp: 'Регистрация',
        login: 'Влезте',
        passwordsDontMatch: 'Паролите не съвпадат.',
        name: 'Име',
        confirmPassword: 'Повторете паролата',
        createAcc: 'Създай профил',
        alreadyHaveAcc: 'Вече имате профил?',
        shoppingList: 'Списък',
        enterItem: 'Моля въведете име на продукта.',
        itemName: 'Име на продукта',
        addItem: 'Добави продукт',
        allForNow: "Нищо не сте забравили :)"
    }
});

export default strings;