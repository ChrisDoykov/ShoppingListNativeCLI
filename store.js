import {makeAutoObservable, observable, runInAction} from 'mobx';
import firestore from '@react-native-firebase/firestore';

export default class ItemsStore {
  constructor() {
    makeAutoObservable(this);
  }
  items = [];

  loading = false;

  async getItems() {
    this.loading = true;
    try {
      const itemsCollection = await firestore()
        .collection('ShoppingItems')
        .get();
      const itemDocs = itemsCollection.docs;
      runInAction(() => {
        this.items = itemDocs.map(doc => ({id: doc.id, text: doc.data().text}));
        this.loading = false;
      });
    } catch (e) {
      this.setLoadingAction(false);
    }
  }

  async addItem(text) {
    try {
      const newItem = await firestore().collection('ShoppingItems').add({
        text,
      });

      runInAction(() => {
        this.items = [...this.items, {id: newItem.id, text}];
      });
    } catch (e) {}
  }

  async deleteItem(id) {
    try {
      await firestore().collection('ShoppingItems').doc(id).delete();
      runInAction(() => {
        this.items = [...this.items.filter(item => item.id !== id)];
      });
    } catch (e) {}
  }

  setLoadingAction = loadingValue => {
    runInAction(() => {
      this.loading = loadingValue;
    });
  };
}
