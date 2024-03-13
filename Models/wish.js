const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  offDay: { type: String },
  region: { type: String, required: true },
  gmaps: { type: String },
  category: { type: String },
  isDeleted: { type: Boolean },
  createdAt: { type: Date },
  tags: [{ type: String }],
  visitDate: [{ type: Date }],
});

module.exports = mongoose.model("Wish", wishSchema);
