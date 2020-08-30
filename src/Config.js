import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyARSMEvrHQyXq8eZ9A5aYidogb_PD1Td38",
    authDomain: "massanger-762d1.firebaseapp.com",
    databaseURL: "https://massanger-762d1.firebaseio.com",
    projectId: "massanger-762d1",
    storageBucket: "massanger-762d1.appspot.com",
    messagingSenderId: "626241997383",
    appId: "1:626241997383:web:c539753652455bdf043f62"
  };
  // Initialize Firebase
  const fir = firebase.initializeApp(firebaseConfig);
  export default fir
