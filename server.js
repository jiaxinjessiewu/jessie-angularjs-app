// server.js

// modules =================================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

// express route definitions
var edittask = require("./routes/edittask");

// configuration ===========================================

// config files
var url =
  "mongodb://jessie_wu:aa123000@ds335648.mlab.com:35648/heroku_vs9cxgxq";

// set port
var port = process.env.PORT || 8080;

// connect to mongoDB database
mongoose.connect(url, {
  useMongoClient: true
});
// mongoose.connect("mongodb://localhost/jessie_angular_app", {
//   useMongoClient: true
// });

// use a favicon
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

// logger
app.use(logger("dev"));

//parse cookies
app.use(cookieParser());

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + "/public"));

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

// routes ==================================================
app.use("/edittask", edittask);
app.get("/all", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/dailytasks", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("jessie_angularjs_app")
      .find({})
      .toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get projects.");
        } else {
          res.status(200).json(docs);
        }
      });
    db.close();
  });
});

app.put("/update/:id", function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var update_task = req.body;
    delete update_task._id;

    db.collection("jessie_angularjs_app").updateOne(
      { _id: new ObjectID(req.params.id) },
      update_task,
      function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to update contact");
        } else {
          res.status(204).end();
        }
      }
    );
    db.close();
  });
});

app.listen(port);

// expose app
module.exports = app;
