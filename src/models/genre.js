const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    background_image: {
      type: String,
      required: true,
    },
    games_count: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
