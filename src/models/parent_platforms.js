const mongoose = require("mongoose");

const parent_platformsSchema = new mongoose.Schema(
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
      strict: true
    },
  },
  {
    timestamps: true,
  }
);

const Parent_platforms = mongoose.model("Parent_platforms", parent_platformsSchema);
module.exports = Parent_platforms;
