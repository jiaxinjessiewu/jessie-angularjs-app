//edit task: 1. get, get all tasks 2. put, add new task, 3. post, update a task 4. delete, delete a task
//home page: 1. get, get daily task 2. post,update task status
var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectID = require("mongodb").ObjectID;
var uri =
  "mongodb://jessie_wu:aa123000@ds335648.mlab.com:35648/heroku_vs9cxgxq";
router.get("/", function(req, res, next) {
  // this page is not supposed to receive GET requests
  res.redirect("/");
});
router.get("/all", function(req, res, next) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    db.collection("jessie_angularjs_app")
      .find({})
      .toArray(function(err, results) {
        if (err) {
          handleError(res, err.message, "Failed to get tasks.");
        } else {
          res.status(200).json(results);
        }
      });
    db.close();
  });
});

router.post("/newtask", function(req, res, next) {
  var title = req.body.task_title;
  var details = req.body.details;
  var due_date = req.body.due_date;
  var finish = req.body.finish;
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    db.collection("jessie_angularjs_app").insertOne(
      {
        title: title,
        details: details,
        due_date: due_date,
        finish: finish
      },
      function(err, response) {
        if (err) {
          console.log("An error occurred while inserting new task: ", err);
        } else {
          res.status(200).send("New task added successfully");
        }

        db.close();
      }
    );
  });
});

router.put("/task/:task_id", function(req, res, next) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;

    var update_task = req.body;
    delete update_task._id;

    db.collection("jessie_angularjs_app").updateOne(
      { _id: new ObjectID(req.params.task_id) },
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

router.delete("/task/:task_id", function(req, res, next) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;

    var delete_task = req.body;
    delete delete_task._id;

    db.collection("jessie_angularjs_app").deleteOne(
      { _id: new ObjectID(req.params.task_id) },
      function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete contact");
        } else {
          res.status(204).end();
        }
      }
    );
    db.close();
  });
});

module.exports = router;
