const express = require("express");
const Auth = require("../middleware/auth");
const Platform = require("../models/platform");

const router = new express.Router();

// create platform
router.post("/platform", Auth, async (req, res) => {
  try {
    const newPlatform = new Platform({
      ...req.body,
    });
    await newPlatform.save();
    res.status(201).send(newPlatform);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch platform
router.get("/platform/:id", async (req, res) => {
  try {
    const platform = await Platform.findOne({ _id: req.params.id });
    if (!platform) {
      return res.status(204).send({ error: "platform not found" });
    }
    res.status(200).send(platform);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch all items
router.get("/platform", async (req, res) => {
  try {
    const platform = await Platform.find({});
    if (!platform.length) {
      return res.status(204).send([]);
    }
    res.status(200).send(platform);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update an item
router.put("/platform/:id", Auth, async (req, res) => {
  const fields = Object.keys(req.body);
  console.log({fields});
  const allowedFields = [
    "name",
    "slug",
    "background_image",
  ];
  const isValidOperation = fields.every((field) => {
    return allowedFields.includes(field);
  });
  console.log({isValidOperation});
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const platform = await Platform.findOne({ _id: req.params.id });
    if (!platform) {
      return res.status(404).send({ error: "platform not found" });
    }
    fields.forEach((field) => (platform[field] = req.body[field]));
    await platform.save();
    res.status(200).send(platform);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete an platform
router.delete("/platform/:id", Auth, async (req, res) => {
  try {
    const deletedPlatform = await Platform.findOneAndDelete({ _id: req.params.id });
    if (!deletedPlatform) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedPlatform);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
