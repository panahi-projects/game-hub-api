const express = require("express");
const Auth = require("../middleware/auth");
const Item = require("../models/item");

const router = new express.Router();

// create item
router.post("/items", Auth, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      owner: req.user._id,
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch item
router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      return res.status(204).send({ error: "Item not found" });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch all items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items.length) {
      return res.status(204).send([]);
    }
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update an item
router.put("/items/:id", Auth, async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = [
    "name",
    "slug",
    "released",
    "background_image",
    "genres",
  ];
  const isValidOperation = fields.every((field) => {
    return allowedFields.includes(field);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }
    fields.forEach((field) => (item[field] = req.body[field]));
    await item.save();
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete an item
router.delete("/items/:id", Auth, async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
