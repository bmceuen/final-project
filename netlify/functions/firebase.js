const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyAqehWmWJG8VidrDL_FYVby3ssoRODuYO8",
  authDomain: "kiei-451-ab7d5.firebaseapp.com",
  projectId: "kiei-451-ab7d5",
  storageBucket: "kiei-451-ab7d5.appspot.com",
  messagingSenderId: "942506131765",
  appId: "1:942506131765:web:7be4540e5d71ed0fc9cc7c"
} // replace 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase