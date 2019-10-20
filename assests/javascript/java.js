var config = {
    apiKey: "AIzaSyDUc2jv4VcXWqxmveEZgkpA_arFuQ_Sjrc",
    authDomain: "fir-presence.firebaseapp.com",
    databaseURL: "https://fir-presence.firebaseio.com",
    storageBucket: "fir-presence.appspot.com",
    messagingSenderId: "1029172247104"
  };
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database.
  var database = firebase.database();