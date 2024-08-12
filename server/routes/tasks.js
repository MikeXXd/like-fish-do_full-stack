const auth = require("../middleware/auth");
const express = require("express");
const Tasks = require("../db/models/task");
const { isValidObjectId } = require("mongoose");

const router = express.Router();

router
  .route("/")
  .get(auth, async (_, res) => {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  })
  .post(auth, async (req, res) => {
      const taskData = req.body;
      const newTask = new Tasks(taskData);
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
  })
  .delete(auth, async (req, res) => {
      if (isValidObjectId(req.body.id)) {
        const taskId = req.body.id;
        await Tasks.findByIdAndDelete(taskId);
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
  })
  .put(auth, async (req, res) => {
      if (isValidObjectId(req.body.id)) {
        const taskId = req.body.id;
        const taskData = req.body;
        await Tasks.findByIdAndUpdate(taskId, taskData);
        res.status(202).json({ message: "Task updated successfully" });
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
  });

module.exports = router;
