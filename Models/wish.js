const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  offDay: { type: String, required: true },
  region: { type: String, required: true },
  gmaps: { type: String },
  category: { type: String },
  isDeleted: { type: Boolean },
  visitDate: [{ type: Date, required: true }],
});

module.exports = mongoose.model("Wish", wishSchema);
