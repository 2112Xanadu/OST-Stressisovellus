"use strict";

// Creating variables for node modules and port.

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const userRoute = require("./routes/userRoute");
const stressRoute = require("./routes/stressRoute");
const authRoute = require("./routes/authRoute");
const kubiosRoute = require("./routes/kubiosRoute");
//const surveyRoute = require('./routes/surveyRoute');

const passport = require("./utils/pass");
const app = express();
const port = 3000;

// Static Files
app.use(express.static("public"));

// Express json for reading and saving json files.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/
app.use(cors());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("index.html");
  }
};

app.get("/login", loggedIn, (req, res) => {
  if (req.session.logged === true) {
    //res.render('home');
    res.redirect("home.html");
  } else {
    res.redirect("index.html");
  }
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/form" }),
  (req, res) => {
    //console.log('/login success line 52');
    res.redirect("home.html");
  }
);

// Routes for user, auth, Kubios and stress survey.
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/auth", authRoute);
app.use("/stress", stressRoute);
app.use("/kubios", kubiosRoute);
/* app.use("/survey", surveyRoute); */

// Function for error if app.js doesn't work.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message || "internal error");
});

// Tells what port the server is listening
app.listen(port, () => console.log(`Listening on port ${port}!`));
