
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import * as firebase from 'firebase';
// import 'bootstrap/dist/css/bootstrap.css';

import './style/css/new_style.css';

require('dotenv').config()

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

// class App2 extends React.Component {
//     constructor() {
//         super();
//     }
//     render() {
//         return (
//           <meta http-equiv="refresh" content="0; URL='http://boxaladin.asia/maintenance'" />
//         );
//     }
// }
//
// ReactDOM.render(<App2 />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
unregister();
