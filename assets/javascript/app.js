// only run for up to two players

// if 0 or 1 players: allow players to enter a name

// entering the game:
// enter a name
// enter a move

// Initialize Firebase
var config = {
    apiKey: "AIzaSyADSjuzOtZEUMqc1ebydBlW1PG9uCOrHac",
    authDomain: "rps-multiplayer-2d2c1.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-2d2c1.firebaseio.com",
    projectId: "rps-multiplayer-2d2c1",
    storageBucket: "",
    messagingSenderId: "983090244555"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// set firebase areas
var playerInfo = database.ref("/players");

// set number of players
var numPlayers = 2;

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

var newPlayer;

var key; // this will be the ID key generated by adding a log-in event

// When the client's connection state changes...
connectedRef.on("value", function(snap) {
    if (snap.val()) {
        // Add user to the connections list.
        // var player = connectionsRef.push(newPlayer);

        var player = connectionsRef.push();
        key = player.key;

        newPlayer = {
            id: key,
            name: "temp",
            move: "temp",
            wins: 2,
            losses: 0,
            gamesplayed: 0,
            ready: false
        };

        // var player = connectionsRef.push(newPlayer);
        // var key = player.key;
        player.set(newPlayer);
        console.log(key);
        console.log(newPlayer);

        // Remove user from the connection list when they disconnect.
        player.onDisconnect().remove();
    }
});

// var myRef = firebase.database().ref().push();
//   var key = myRef.key();

//   var newData={
//       id: key,
//       Website_Name: this.web_name.value,
//       Username: this.username.value,
//       Password : this.password.value,
//       website_link : this.web_link.value
//    }

//    myRef.push(newData);

connectionsRef.on("value", function(snapshot) {
    currPlayers = snapshot.numChildren();
    console.log(currPlayers);
});

$(".move-button").on("click", function(event) {
    event.preventDefault();

    // print to console
    console.log($(this).attr("id"));

    var newMove = $(this).attr("id");

    // update firebase object
    newPlayer.move = newMove;

    database.ref("/connections/" + key).update({
        move: newMove,
        ready: true
    });

    console.log(key);
});
