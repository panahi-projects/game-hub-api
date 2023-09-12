const express = require("express");
const Auth = require("../middleware/auth");
const Game = require("../models/game");
const ApiResponse = require("../helpers/ApiResponse");

const router = new express.Router();

// create game
router.post("/games", Auth, async (req, res) => {
  try {
    const newItem = new Game({
      ...req.body,
      owner: req.user._id,
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch game
router.get("/games/:id", async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (!game) {
      return res.status(204).send({ error: "Game not found" });
    }
    res.status(200).send(
      ApiResponse.notrmalizer(
        {
          results: game,
          message: "fetched data successfully",
        },
        "single"
      )
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch all games
router.get("/games", async (req, res) => {
  try {
    // const games = await Game.find({});
    const games = await Game.aggregate([
      {
        $lookup: {
          from: "genres",
          localField: "genres._id",
          foreignField: "_id",
          as: "genre",
        },
      },
      // {
      //   $unwind: "$genre",
      // },
      {
        $lookup: {
          from: "platforms",
          localField: "platforms._id",
          foreignField: "_id",
          as: "platformsData",
        },
      },
      {
        $lookup: {
          from: "parent_platforms",
          localField: "parent_platforms.platform._id",
          foreignField: "_id",
          as: "parent_platformsData",
        },
      },
      {
        $unwind: "$parent_platformsData",
      },
      {
        $group: {
          _id: "$_id",
          slug: { $first: "$slug" },
          name: { $first: "$name" },
          background_image: { $first: "$background_image" },
          released: { $first: "$released" },
          rating: { $first: "$rating" },
          metacritic: { $first: "$metacritic" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          genres: {
            $first: "$genre.slug",
          },
          platforms: { $first: "$platformsData" },
          parent_platforms: {
            $push: {
              platform: "$parent_platformsData",
            },
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      // {
      //   $limit: 3,
      // },
    ]);
    if (!games.length) {
      return res.status(204).send([]);
    }
    res.status(200).send(
      ApiResponse.notrmalizer(
        {
          results: games,
          message: "fetched data list successfully",
        },
        "bulk"
      )
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

//update an game
router.put("/games/:id", Auth, async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = [
    "name",
    "slug",
    "released",
    "background_image",
    "rating",
    "metacritic",
    "genres",
    "platforms",
    "parent_platforms",
  ];
  const isValidOperation = fields.every((field) => {
    return allowedFields.includes(field);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (!game) {
      return res.status(404).send({ error: "Game not found" });
    }
    fields.forEach((field) => (game[field] = req.body[field]));
    await game.save();
    res.status(200).send(game);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete an game
router.delete("/games/:id", Auth, async (req, res) => {
  try {
    const deletedItem = await Game.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      return res.status(404).send({ error: "Game not found" });
    }
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
