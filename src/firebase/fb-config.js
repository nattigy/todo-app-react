import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFiPVuohh23BQfmn63ehcZP3aJ5AyC69c",
    authDomain: "todo-app-835e1.firebaseapp.com",
    projectId: "todo-app-835e1",
    storageBucket: "todo-app-835e1.appspot.com",
    messagingSenderId: "783788679234",
    appId: "1:783788679234:web:cbc02bac5eb3b9896fcddb"
};

firebase.initializeApp(firebaseConfig);
export default firebase;