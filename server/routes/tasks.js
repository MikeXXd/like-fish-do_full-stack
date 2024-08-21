const auth = require("../middleware/auth");
const express = require("express");
const { Tasks, validate } = require("../db/models/task");
const { isValidObjectId } = require("mongoose");

const router = express.Router();


//TODO: create a middleware to check if the id is valid like in delete 
// router.use("/:id", checkValidObjectId);

// async function checkValidObjectId(req, res, next) {
//   try {
//     if (!isValidObjectId(req.params.id)) {
//       return res.status(400).json({ error: "Invalid id" });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

router
  .route("/")
  .get(auth, async (_, res) => {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  })
  .post(auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }
    const newTask = new Tasks(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  });

router
  .route("/:id")
  .delete(auth, async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ error: "Invalid id" });
    }
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "task not fonnd" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  })
  .put(auth, async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ error: "Invalid id" });
    }
    const { title, importance, done, star, finishedAt } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      { title, importance, done, star, finishedAt },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    }
    res.status(202).json({ message: "Task updated successfully" });
  });

module.exports = router;
