import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA-5Yg3xNnHfrkhEQkzYIh46neCklIXN4I",
    authDomain: "mochi-chat-3594f.firebaseapp.com",
    databaseURL: "https://mochi-chat-3594f.firebaseio.com",
    projectId: "mochi-chat-3594f",
    storageBucket: "mochi-chat-3594f.appspot.com",
    messagingSenderId: "899179549683",
    appId: "1:899179549683:web:8508405d0ceb026d79f886",
    measurementId: "G-8EBDP7PGJB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider}
  export default db;