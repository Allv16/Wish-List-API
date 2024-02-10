require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const wishRouter = require("./Routes/wish-routes");

app.use(bodyParser.json());
app.use(wishRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error" });
});

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Failed to connect to database"))
  .finally(() => {
    app.listen(process.env.PORT, () => {
      console.log(`on port ${process.env.PORT}`);
    });
  });

module.exports = app;
