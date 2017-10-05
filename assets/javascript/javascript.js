var config = {
  apiKey: "AIzaSyDutQUo1dDPo6SJ4HeZu1l2fZo4dtbi_8I",
  authDomain: "trains-69194.firebaseapp.com",
  databaseURL: "https://trains-69194.firebaseio.com",
  projectId: "trains-69194",
  storageBucket: "trains-69194.appspot.com",
  messagingSenderId: "711882834409"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
  event.preventDefault();

  var name = $("#name").val().trim();
  var dest = $("#dest").val().trim();
  var first = $("#first").val().trim();
  var freq = $("#freq").val().trim();

  database.ref().push({
    name: name,
    dest: dest,
    first: first,
    freq: freq
  })
})

database.ref().on("child_added", function(snapshot) {
  var name = $("<td>").text(snapshot.val().name);
  var dest = $("<td>").text(snapshot.val().dest);
  var freq = snapshot.val().freq;
  var frequency = $("<td>").text(freq);

  var first = snapshot.val().first; //first train time ex. 00:00
  var firstArr = first.split(":") //array ex. [00, 00]
  var trainTime = moment().hours(firstArr[0]).minutes(firstArr[1]).seconds(0); //calls moment() and changes hours/minutes to first train time

  var diff = moment().diff(moment(trainTime), "minutes");

  while (diff > 0) {//when diff becomes < 0, it means that train has not arrived yet, so we will use that as 'next train' time
    trainTime = moment(trainTime).add(freq, "minutes");//increment train time by the frequency
    diff = moment().diff(moment(trainTime), "minutes");//rechecks the difference between now and train
  }

  var next = moment(trainTime).format("hh:mm");//gets train time from above and format it
  next = $("<td>").text(next);

  var away = moment(trainTime).diff(moment(), "minutes");//difference between next train and now
  away = $("<td>").text(away);

  var newTR = $("<tr>");
  newTR.append(name, dest, frequency, next, away)
  $("#addSchedule").append(newTR);
})




//init firebase
//firebase on added_child
//get values from firebase
//write to html
//
//on button click
//grab values from html
//push to firebase