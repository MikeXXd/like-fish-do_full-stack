const express = require("express");
const router = express.Router();
const Tasks = require("../db/models/Tasks");

router
  .route("/")
  .get((_, res) => {
      Tasks.find()
        .then((tasks) => res.json(tasks))
        .catch((err) => {
          console.error("Error retrieving tasks:", err);
          res.status(500).json({ error: "Failed to retrieve tasks" });
        });
    })
  .post((req, res) => {
    const taskData = req.body;
    const newTask = new Tasks(taskData);
    newTask
      .save()
      .then((task) => res.json(task))
      .catch((err) => {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Failed to create task" });
      });
  })
  .delete((req, res) => {
    const taskId = req.body.id;
    Tasks.findByIdAndDelete(taskId)
      .then(() => {
        Tasks.find()
          .then((tasks) => res.json(tasks))
          .catch((err) => {
            console.error("Error retrieving tasks:", err);
            res.status(500).json({ error: "Failed to retrieve tasks" });
          });
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Failed to delete task" });
      });
  })
  .put((req, res) => {
    const taskId = req.body.id;
    const taskData = req.body;
    Tasks.findByIdAndUpdate(taskId, taskData)
      .then(() => {
        Tasks.find()
          .then((tasks) => res.json(tasks))
          .catch((err) => {
            console.error("Error retrieving tasks:", err);
            res.status(500).json({ error: "Failed to retrieve tasks" });
          });
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Failed to update task" });
      });
  });

module.exports = router;
