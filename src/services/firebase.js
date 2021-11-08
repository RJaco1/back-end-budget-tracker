var firebase = require('firebase-admin');

var serviceAccount = require("../certs/firebase-cert.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;