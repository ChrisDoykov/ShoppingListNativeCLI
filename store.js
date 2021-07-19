import { makeAutoObservable, runInAction } from 'mobx';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
import strings from './translations';

export class UsersStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  loading = false;

  async onAuthStateChanged() {
    this.loading = true;
    try {
      const usersRef = firestore().collection('users');
      auth().onAuthStateChanged(async user => {
        if (user) {
          const userRef = await usersRef.doc(user.uid).get();
          if (userRef.data()) {
            const userData = userRef.data();
            runInAction(() => {
              this.user = userData;
              this.loading = false;
            });
          } else {
            this.setLoadingAction(false);
          }
        } else {
          this.setLoadingAction(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    this.loading = true;
    try {
      await auth().signOut();
      runInAction(() => {
        this.user = null;
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      this.setLoadingAction(false);
    }
  }

  async login(email, password) {
    this.loading = true;
    try {
      const loginRes = await auth().signInWithEmailAndPassword(email, password);

      if (loginRes.user) {
        const uid = loginRes.user.uid;

        const userData = await firestore().collection('users').doc(uid).get();

        const user = {
          ...userData.data(),
        };

        runInAction(() => {
          this.user = user;
          this.loading = false;
        });

        return {
          success: true,
          user,
        };
      }
    } catch (e) {
      console.warn(e.code);
      console.error(e);

      if (e.code.toString().includes('wrong-password')) {
        // alert('Wrong Password! Please try again.');
      }
      if (e.code.toString().includes('too-many-requests')) {
        // alert('Too many bad login attempts! Please try again later.');
        return {
          failed: true,
          error: 'Too many reqs',
        };
      }

      this.setLoadingAction(false);
      return {
        failed: true,
        error: e,
      };
    }
  }

  async register(email, password, fullName) {
    this.loading = true;
    let response;
    try {
      response = await auth().createUserWithEmailAndPassword(email, password);

      if (response.user) {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };

        const usersRef = firestore().collection('users');
        await usersRef.doc(uid).set({
          ...data,
        });

        const itemsRef = firestore().collection('ShoppingItems');
        await itemsRef.doc(uid).set({
          items: [],
          userId: uid
        });

        runInAction(() => {
          this.user = data;
          this.loading = false;
        });

        return Promise.resolve({ success: true, user: data });
      }
    } catch (e) {
      console.log('E IS: ', e);
      this.setLoadingAction(false);

      return Promise.reject({ failed: true, error: e });
    }
  }

  setLoadingAction = loadingValue => {
    runInAction(() => {
      this.loading = loadingValue;
    });
  };
}



export class ItemsStore {
  constructor() {
    makeAutoObservable(this);
  }

  userId = '';

  items = [];

  loading = false;

  setUserId(userId) {
    this.loading = true;
    runInAction(() => {
      this.userId = userId;
      this.loading = false;
    });
  }

  async getItems() {
    this.loading = true;
    try {
      const itemDocs = await firestore()
        .collection('ShoppingItems')
        .doc(this.userId).get();


      // Will be only one
      const items = [...itemDocs.data().items.map(item => {
        return { text: item, id: uuid.v4() };
      })];

      runInAction(() => {
        this.items = [...items];
        this.loading = false;
      });

    } catch (e) {
      this.setLoadingAction(false);
    }
  }

  async addItem(text) {
    try {

      runInAction(() => {
        this.items = [...this.items, { text, id: uuid.v4() }];
      });

      await firestore()
        .collection('ShoppingItems')
        .doc(this.userId).set({
          items: [...this.items.map(item => item.text)]
        });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteItem(id) {
    try {
      runInAction(() => {
        this.items = [...this.items.filter(item => item.id !== id)];
      });

      await firestore()
        .collection('ShoppingItems')
        .doc(this.userId).set({
          items: [...this.items.map(item => item.text)]
        });
    } catch (e) {
      console.log(e);
    }
  }

  setLoadingAction = loadingValue => {
    runInAction(() => {
      this.loading = loadingValue;
    });
  };
}

export class AlertsStore {
  constructor() {
    makeAutoObservable(this);
  }

  shown = false;
  settings = {
    showProgress: false,
    title: "",
    message: "",
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: false,
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: strings.cancel,
    confirmText: "OK",
    confirmButtonColor: "#00BCD4",
    onCancelPressed: () => {
      this.hideAlert();
    },
    onConfirmPressed: () => {
      this.hideAlert();
    },
  };

  hideAlert = () => {
    runInAction(() => {
      this.shown = false;
    });
  };

  showAlert = () => {
    runInAction(() => {
      this.shown = true;
    });
  };

  updateSettings(settings) {
    runInAction(() => {
      this.settings = {
        ...this.settings,
        ...settings
      };
    });
  }
}
