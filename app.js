"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// https://expressjs.com/, https://github.com/npatel023/ExpressMySQL/, https://www.passportjs.org/concepts/authentication/middleware/
// Creating variables for node modules and port.

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const kubiosRoute = require("./routes/kubiosRoute");
const stressRoute = require("./routes/stressRoute");
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

// Basic routing
app.get("/login", loggedIn, (req, res) => {
  if (req.session.logged === true) {
    //res.render('home');
    res.redirect("home.html");
  } else {
    res.redirect("index.html");
  }
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/form" }), (req, res) => {
  //console.log('/login success line 52');
  res.redirect("home.html");
}
);

// Routes for user, auth, Kubios and stress survey.
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/auth", authRoute);
app.use("/kubios", kubiosRoute);
app.use("/stress", passport.authenticate("jwt", { session: false }), stressRoute);

// For errors if app.js doesn't work.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message || "internal error");
});

// Tells what port the server is listening
app.listen(port, () => console.log(`Listening on port ${port}!`));
