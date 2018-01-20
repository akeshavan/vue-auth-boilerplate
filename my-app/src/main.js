// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import firebase from 'firebase';
import App from './App';
import router from './router';


Vue.config.productionTip = false;


const config = {
  apiKey: 'AIzaSyDUvIQct31754lEJDhJW2envdEkmqctX2I',
  authDomain: 'my-test-project-aa983.firebaseapp.com',
  databaseURL: 'https://my-test-project-aa983.firebaseio.com',
  projectId: 'my-test-project-aa983',
  storageBucket: 'my-test-project-aa983.appspot.com',
  messagingSenderId: '539995758455',
};

firebase.initializeApp(config);
window.firebase = firebase;
let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
    });
  }
});
