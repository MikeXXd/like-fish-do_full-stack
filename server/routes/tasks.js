const express = require("express");
const router = express.Router();
const Tasks = require("../db/models/Tasks");

router
  .route("/")
  .get((req, res) => {
    Tasks.find()
      .then((tasks) => res.json(tasks))
      .catch((err) => res.json(err));
  })
  .post((req, res) => {
    const taskData = req.body;
    const newTask = new Tasks(taskData);
    newTask
      .save()
      .then((task) => res.json(task))
      .catch((err) => res.json(err));
  })
  .delete((req, res) => {
    const taskId = req.body.id;
    Tasks.findByIdAndDelete(taskId)
      .then(() => {
        Tasks.find()
          .then((tasks) => res.json(tasks))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  })
  .put((req, res) => {
    const taskId = req.body.id;
    const taskData = req.body;
    Tasks.findByIdAndUpdate(taskId, taskData)
      .then(() => {
        Tasks.find()
          .then((tasks) => res.json(tasks))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

module.exports = router;
