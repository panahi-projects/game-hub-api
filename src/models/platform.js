const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
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
    background_image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Platform = mongoose.model("Platform", platformSchema);
module.exports = Platform;
