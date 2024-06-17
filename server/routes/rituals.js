const express = require("express");
const router = express.Router();
const Rituals = require("../db/models/Rituals");

router
  .route("/")
  .get((req, res) => {
    Rituals.find()
      .then((tasks) => res.json(tasks))
      .catch((err) => res.json(err));
  })
  .post((req, res) => {
    const ritualData = req.body;
    const newRitual = new Rituals(ritualData);
    newRitual
      .save()
      .then((task) => res.json(task))
      .catch((err) => res.json(err));
  })
  .delete((req, res) => {
    const ritualId = req.body.id;
    Rituals.findByIdAndDelete(ritualId)
      .then(() => {
        Rituals.find()
          .then((tasks) => res.json(tasks))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  })
  .put((req, res) => {
    const ritualId = req.body.id;
    const ritualData = req.body;
    Rituals.findByIdAndUpdate(ritualId, ritualData)
      .then(() => {
        Rituals.find()
          .then((tasks) => res.json(tasks))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

module.exports = router;
