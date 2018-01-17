import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD384SUrkibh_5ht78CLR_Fttc7k945sO8",
  authDomain: "kanban-irianto.firebaseapp.com",
  databaseURL: "https://kanban-irianto.firebaseio.com",
  projectId: "kanban-irianto",
  storageBucket: "kanban-irianto.appspot.com",
  messagingSenderId: "231233131978"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
