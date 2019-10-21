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

var trainTime;
var destination;
var firstTrainTime;
var frequency;

$(document).ready(function () {

  var database = firebase.database();

  $("#submit").on("click", function (event) {
    event.preventDefault();

    var formTrainName = $("#formTrainName").val();
    var formDestination = $("#formDestination").val();
    var formFirstTrainTime = $("#formFirstTrainTime").val();
    var formFrequency = $("#formFrequency").val();

    database.ref().push({
      trainTime: formTrainName,
      destination: formDestination,
      firstTrainTime: formFirstTrainTime,
      frequency: formFrequency,
    });
  });

  database.ref().on('child_added', function (snap) {
    var newTrainName = snap.val().trainTime;
    var newDestination = snap.val().destination;
    var newFirstTrainTime = snap.val().firstTrainTime;
    var newFrequency = snap.val().frequency;

    var currentTime = moment();
    var firstTimeConverted = moment(newFirstTrainTime, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemainder = timeDiff % newFrequency;
    var minUntilNext = newFrequency - timeRemainder;
    var nextTrainTime = moment().add(minUntilNext, "minutes").format("hh:mm");

    $("#infoTable").append("<tr><td>" +
      newTrainName + "</td><td>" +
      newDestination + "</td><td>" +
      newFrequency + "</td><td>" +
      nextTrainTime + "</td><td>" +
      minUntilNext + "</td></tr>");

  });
});