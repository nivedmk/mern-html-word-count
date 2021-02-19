require("./src/db/mongoDB");
const app = require("./src/app");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT | 4000;

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
