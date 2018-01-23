import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
// import 'bootstrap/dist/css/bootstrap.css'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDjiWTez3r_lZreCZUvIUhaSj8-rIWfhgw",
  authDomain: "boxaladin-auction.firebaseapp.com",
  databaseURL: "https://boxaladin-auction.firebaseio.com",
  projectId: "boxaladin-auction",
  storageBucket: "boxaladin-auction.appspot.com",
  messagingSenderId: "912503242137"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
