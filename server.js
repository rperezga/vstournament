const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const io = require('socket.io')();
const MongoClient = require("mongodb").MongoClient;

const users = require("./routes/api/users");
const brackets = require("./routes/api/brackets");
const games = require("./routes/api/games");
const matches = require("./routes/api/matches");
const notifications = require("./routes/api/notifications");
const tournaments = require("./routes/api/tournaments");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Heather middleware
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Request-Headers, Accept, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/brackets", brackets);
app.use("/api/games", games);
app.use("/api/matches", matches);
app.use("/api/notifications", notifications);
app.use("/api/tournaments", tournaments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));


// ----  REAL TIME DATABASE  --------
// ----  WEB SOCKET  -------- 
 
io.on('connection', (socket) => {
  socket.on('subscribeToTimer', (interval) => {

    const pipeline = [
      {
        $project: { documentKey: false }
      }
    ];
    
    MongoClient.connect(db)
      .then(client => {
    
        console.log("Connected correctly to server");
        // specify db and collections
        const db = client.db();
        const collection = db.collection("notifications");
    
        const changeStream = collection.watch(pipeline);
        // start listen to changes
        changeStream.on("change", function (change) {
          console.log('----------------------------------------------------')
          console.log(change);

          socket.emit('changeUpdate', change);
          
        });         
    
      })
      .catch(err => {
        console.error(err);
      });    
  });
});

const socketPort = 8080;
io.listen(socketPort);
console.log('listening on port ', socketPort);



