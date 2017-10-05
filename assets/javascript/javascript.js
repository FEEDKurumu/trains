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
  var freq = $("<td>").text(snapshot.val().freq);
  
  var first = snapshot.val().first;
  console.log(first)
  var now = moment().format("LT");
  console.log(now)
  console.log(moment(first).add(10, "mins"))
})




//init firebase
//firebase on added_child
//get values from firebase
//write to html
//
//on button click
//grab values from html
//push to firebase