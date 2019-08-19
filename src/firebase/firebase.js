import firebase from 'firebase'
import { AsyncStorage } from 'react-native'

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyCP5wQMvItYmqmRpJkCEqKDo_H-8koaLRk",
        authDomain: "ngechat-f8c98.firebaseapp.com",
        databaseURL: "https://ngechat-f8c98.firebaseio.com",
        projectId: "ngechat-f8c98",
        storageBucket: "",
        messagingSenderId: "206528886585",
        appId: "1:206528886585:web:2d4afc7a5dad6b51"
      });
    }
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;