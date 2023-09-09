const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema(
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
      strict: true
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
    genres: [
      {
        genreId: {
          type: ObjectID,
          ref: "Genre",
          required: true,
          strict: true
        },
        slug: {
          type: String,
        },
      },
    ],
    platforms: [
      {
        platformId: {
          type: ObjectID,
          ref: "Platform",
          required: true,
          strict: true
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
