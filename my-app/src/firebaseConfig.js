import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDUvIQct31754lEJDhJW2envdEkmqctX2I',
  authDomain: 'my-test-project-aa983.firebaseapp.com',
  databaseURL: 'https://my-test-project-aa983.firebaseio.com',
  projectId: 'my-test-project-aa983',
  storageBucket: 'my-test-project-aa983.appspot.com',
  messagingSenderId: '539995758455',
};

firebase.initializeApp(config);

export const db = firebase.database();
console.log('db is', db);
