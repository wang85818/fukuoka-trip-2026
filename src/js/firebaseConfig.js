// firebaseConfig.js - Firebase Initialization

const firebaseConfig = {
  apiKey: "AIzaSyDHu73tPpecwuYpf4Il-G0AMtyxqfjbFHQ",
  authDomain: "fukuoka-trip-fe725.firebaseapp.com",
  projectId: "fukuoka-trip-fe725",
  storageBucket: "fukuoka-trip-fe725.firebasestorage.app",
  messagingSenderId: "847063005945",
  appId: "1:847063005945:web:ea2fcb105bc60fd19c8028",
  measurementId: "G-1NWKYTX619",
  databaseURL: "https://fukuoka-trip-fe725-default-rtdb.firebaseio.com"
};

// Initialize Firebase using compat SDK
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    // Expose database reference to window for other modules
    window.db = firebase.database();
} else {
    console.error("Firebase SDK not loaded.");
}
