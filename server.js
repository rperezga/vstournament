const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const brackets = require("./routes/api/brackets");
const events = require("./routes/api/events");
const games = require("./routes/api/games");
const matches = require("./routes/api/matches");
const notifications = require("./routes/api/notifications");
const tournaments = require("./routes/api/tournaments");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
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

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/brackets", brackets);
app.use("/api/events", events);
app.use("/api/games", games);
app.use("/api/matches", matches);
app.use("/api/notifications", notifications);
app.use("/api/tournaments", tournaments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
