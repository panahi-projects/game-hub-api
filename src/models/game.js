const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const gameSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectID,
      required: true,
      ref: "User",
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      strict: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    released: {
      type: String,
      required: true,
    },
    background_image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number
    },
    metacritic: {
      type: Number
    },
    genres: [
      {
        _id: {
          type: ObjectID,
          ref: "Genre",
          required: true,
        },
      },
    ],
    platforms: [
      {
        _id: {
          type: ObjectID,
          ref: "Platform",
        },
      },
    ],
    parent_platforms: [
      {
        platform: {
          _id: {
            type: ObjectID,
            ref: "Parent_platforms",
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
