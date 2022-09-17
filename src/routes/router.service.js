var indexRouter = require("./index.route");
var panelRouter = require("../modules/_panels/panel.route");
var userRouter = require("../modules/user/user.route");

function registerRoutes(app) {
  // add all routers here
  app.use("/", indexRouter);
  app.use("/api/panel", panelRouter);
  app.use("/api/user", userRouter);
}

module.exports = {
  registerRoutes: registerRoutes,
};