const express = require("express");
const Auth = require("../middleware/auth");
const Genre = require("../models/genre");

const router = new express.Router();

// create genre
router.post("/genre", Auth, async (req, res) => {
  try {
    const newGenre = new Genre({
      ...req.body,
    });
    await newGenre.save();
    res.status(201).send(newGenre);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch genre
router.get("/genre/:id", async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    if (!genre) {
      return res.status(204).send({ error: "genre not found" });
    }
    res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch all items
router.get("/genre", async (req, res) => {
  try {
    const genre = await Genre.find({});
    if (!genre.length) {
      return res.status(204).send([]);
    }
    res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update an item
router.put("/genre/:id", Auth, async (req, res) => {
  const fields = Object.keys(req.body);
  console.log({fields});
  const allowedFields = [
    "name",
    "slug",
    "games_count",
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
    const genre = await Genre.findOne({ _id: req.params.id });
    if (!genre) {
      return res.status(404).send({ error: "genre not found" });
    }
    fields.forEach((field) => (genre[field] = req.body[field]));
    await genre.save();
    res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete an genre
router.delete("/genre/:id", Auth, async (req, res) => {
  try {
    const deletedGenre = await Genre.findOneAndDelete({ _id: req.params.id });
    if (!deletedGenre) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedGenre);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
