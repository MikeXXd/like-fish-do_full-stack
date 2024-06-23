const express = require("express");
const Tasks = require("../db/models/Tasks");
const { isValidObjectId } = require("mongoose");

const router = express.Router();

const getTasks = async (res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

router
  .route("/")
  .get(async (_, res) => {
    await getTasks(res);
  })
  .post(async (req, res) => {
    try {
      const taskData = req.body;
      const newTask = new Tasks(taskData);
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      console.error("Error creating task:", err);
      res.status(500).json({ error: "Failed to create task" });
    }
  })
  .delete(async (req, res) => {
    try {
      if (isValidObjectId(req.body.id)) {
        const taskId = req.body.id;
        await Tasks.findByIdAndDelete(taskId);
        await getTasks(res);
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      res.status(500).json({ error: "Failed to delete task" });
    }
  })
  .put(async (req, res) => {
    try {
      if (isValidObjectId(req.body.id)) {
        const taskId = req.body.id;
        const taskData = req.body;
        await Tasks.findByIdAndUpdate(taskId, taskData);
        res.status(202).json({ message: "Task updated successfully" });
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
    } catch (err) {
      console.error("Error updating task:", err);
      res.status(500).json({ error: "Failed to update task" });
    }
  });

module.exports = router;
