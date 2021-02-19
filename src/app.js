const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const webCounterrouter = require("./router/web-counter.router");
const userRouter = require("./router/user.router");

app.use(cors("**"));
app.use(bodyParser.json());
app.use("/webcounter", webCounterrouter);
app.use("/users", userRouter);

app.use("/", (req, res) => {
  res.send("Success");
});

module.exports = app;
