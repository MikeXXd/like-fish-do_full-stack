const taskRouter = require("../routes/tasks.js");
const ritualRouter = require("../routes/rituals.js");
const magicWordRouter = require("../routes/magicWords.js");
const user = require("../routes/users.js");

module.exports = function(app) {
  app.use("/", taskRouter);
  app.use("/tasks", taskRouter);
  app.use("/rituals", ritualRouter);
  app.use("/magic_words", magicWordRouter);
  app.use("/users", user);
};

