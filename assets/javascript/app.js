  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBzZe6Hkgg4CvxV1VjcOOpmbmhYPyxeE4c",
      authDomain: "trainschedule-b8fc1.firebaseapp.com",
      databaseURL: "https://trainschedule-b8fc1.firebaseio.com",
      projectId: "trainschedule-b8fc1",
      storageBucket: "trainschedule-b8fc1.appspot.com",
      messagingSenderId: "327880130259"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function (event) {
      event.preventDefault();

      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var frequency = $("#frequency").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTrainTime);
      console.log(newTrain.frequency);

      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrainTime").val("");
      $("#frequency").val("");
  });

  database.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().firstTrainTime;
      var frequency = childSnapshot.val().frequency;

      var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

      // Current Time
      var currentTime = moment();

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      var tRemainder = diffTime % frequency;

      var MinutesAway = frequency - tRemainder;

      // Next Train
      var nextArrival = moment().add(MinutesAway, "minutes");

      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(firstTrainTime),
          $("<td>").text(frequency),
          $("<td>").text(nextArrival),
          $("<td>").text(MinutesAway)
        );

      $("#trainTable").append(newRow);
  });