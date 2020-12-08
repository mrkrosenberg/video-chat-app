// Firebase config
const firebaseConfig = require('../config/firebaseConfig');

// Firebase initialization
const admin = require('firebase-admin').initializeApp();
const firebase = require('firebase').initializeApp(firebaseConfig);
const functions = require('firebase-functions');
const db = admin.firestore();

module.exports = { admin, firebase, functions, db };