const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isDeleted: { type: Boolean },
  isCompleted: { type: Boolean },
});

module.exports = mongoose.model("Wish", wishSchema);
