const express = require("express");
const WebCounter = require("../models/web-count.model");
const auth = require("../middleware/auth");

const webCounterrouter = express.Router();

webCounterrouter.get("/", auth, async (req, res) => {
  try {
    const webCounters = await WebCounter.find({ owner: req.user._id });

    res.status(200).send(webCounters);
  } catch (e) {
    res.status(500).send(e);
  }
});

webCounterrouter.get("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const webCounter = await WebCounter.findOne({ _id, owner: req.user._id });
    if (!webCounter) {
      return res.status(404).send();
    }

    res.status(200).send(webCounter);
  } catch (e) {
    res.status(500).send(e);
  }
});

webCounterrouter.post("/add", auth, async (req, res) => {
  const webCounter = new WebCounter({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await webCounter.save();
    res.status(201).send(webCounter);
  } catch (e) {
    res.status(400).send(e);
  }
});

webCounterrouter.patch("/update/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["isfavourite"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const webCounter = await WebCounter.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!webCounter) {
      return res.status(400).send("no data");
    }

    webCounter.isfavourite = req.body.isfavourite;
    console.log(webCounter);
    await webCounter.save();
    res.send(webCounter);
  } catch (e) {
    res.status(400).send(e);
  }
});

webCounterrouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const webCounter = await WebCounter.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!webCounter) {
      return res.status(400).send({ err: "Error on deleting" });
    }
    res.status(202).send(webCounter);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = webCounterrouter;
