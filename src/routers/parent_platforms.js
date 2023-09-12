const express = require("express");
const Auth = require("../middleware/auth");
const Parent_platforms = require("../models/parent_platforms");

const router = new express.Router();

// create parent_platforms
router.post("/parent_platforms", Auth, async (req, res) => {
  try {
    const newPlatform = new Parent_platforms({
      ...req.body,
    });
    await newPlatform.save();
    res.status(201).send(newPlatform);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch parent_platforms
router.get("/parent_platforms/:id", async (req, res) => {
  try {
    const parent_platforms = await Parent_platforms.findOne({ _id: req.params.id });
    if (!parent_platforms) {
      return res.status(204).send({ error: "parent_platforms not found" });
    }
    res.status(200).send(parent_platforms);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch all items
router.get("/parent_platforms", async (req, res) => {
  try {
    const parent_platforms = await Parent_platforms.find({});
    if (!parent_platforms.length) {
      return res.status(204).send([]);
    }
    res.status(200).send(parent_platforms);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update an item
router.put("/parent_platforms/:id", Auth, async (req, res) => {
  const fields = Object.keys(req.body);
  console.log({fields});
  const allowedFields = [
    "name",
    "slug",
  ];
  const isValidOperation = fields.every((field) => {
    return allowedFields.includes(field);
  });
  console.log({isValidOperation});
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const parent_platforms = await Parent_platforms.findOne({ _id: req.params.id });
    if (!parent_platforms) {
      return res.status(404).send({ error: "parent_platforms not found" });
    }
    fields.forEach((field) => (parent_platforms[field] = req.body[field]));
    await parent_platforms.save();
    res.status(200).send(parent_platforms);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete an parent_platforms
router.delete("/parent_platforms/:id", Auth, async (req, res) => {
  try {
    const deletedParentPlatform = await Parent_platforms.findOneAndDelete({ _id: req.params.id });
    if (!deletedParentPlatform) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedParentPlatform);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
