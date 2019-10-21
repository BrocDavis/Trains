var firebaseConfig = {
  apiKey: "AIzaSyDUc2jv4VcXWqxmveEZgkpA_arFuQ_Sjrc",
  authDomain: "trilogy-6601b.firebaseapp.com",
  databaseURL: "https://trilogy-6601b.firebaseio.com",
  projectId: "trilogy-6601b",
  storageBucket: "trilogy-6601b.appspot.com",
  messagingSenderId: "414441442662",
  appId: "1:414441442662:web:b79789d643caf3662dcca7",
  measurementId: "G-B147WTJB9Y"
};
  
firebase.initializeApp(firebaseConfig);

var trainName;
var trainDestination;
var trainStart;
var trainFrequency;

$(document).ready(function () {
  
  var database = firebase.database();

  $("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName").val();
    trainDestination = $("#destination").val();
    trainStart = $("#trainStart").val();
    trainFrequency = $("#frequency").val();

    database.ref().push({
      trainName: trainName,
      trainDestination: trainDestination,
      trainStart: trainStart,
      trainFrequency: trainFrequency,
      
    })
    console.log(trainName);
console.log(trainDestination);
console.log(trainStart);
console.log(trainFrequency);
        // Clear the form's values.
        $("#trainName").val("");
        $("#destination").val("");
        $("#trainStart").val("");
        $("#frequency").val("");
  });


//pass data from database as snapshot reference to add to table in html
  database.ref().on("child_added", function (childSnapshot) {

    var newTrainName = childSnapshot.val().trainName;
    var newDestination = childSnapshot.val().trainDestination;
    var newTrainStart = childSnapshot.val().trainStart;
    var newFrequency = childSnapshot.val().trainFrequency;

    console.log("Train name: " + newTrainName)
    console.log("Destination: " + newDestination)
    console.log("First Arrival: " + newTrainStart)
    console.log("Frequency: " + newFrequency)

    var currentTime = moment();
    var firstTimeConverted = moment(newTrainStart, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstTimeConverted, "minutes"));
    var modulusRemainder = timeDifference % newFrequency;
    var minutesAway = newFrequency - modulusRemainder;
    var nextTrainArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

    console.log(currentTime.format("hh:mm a"));
    console.log(firstTimeConverted);
    console.log(timeDifference);
    console.log(modulusRemainder);
    console.log(minutesAway);
    console.log(nextTrainArrival);

    var newRowItem = $(
      "<tr><td>" + newTrainName 
    + "</td><td>" + newDestination 
    + "</td><td>" + nextTrainArrival 
    + "</td><td>" + minutesAway 
    + "</td><td>" + newFrequency 
    + "</td></tr>");

    // Add the data to the table in HTML.
    $("#train-add").append(newRowItem);
  },
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);   
    }); 
});