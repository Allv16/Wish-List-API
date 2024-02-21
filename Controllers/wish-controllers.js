const mongoose = require("mongoose");

const Wish = require("../Models/wish");

const createWish = async (req, res, next) => {
  const { title, content, open, close, offDay, region, gmaps } = req.body;
  try {
    const newWish = await Wish.create({
      title,
      content,
      open,
      close,
      offDay,
      region,
      gmaps,
    });
    res
      .status(200)
      .json({ message: "Succesfully created wish", data: newWish });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

const getAllWish = async (req, res, next) => {
  try {
    const allWish = await Wish.find({ isCompleted: false });
    res
      .status(200)
      .json({ message: "Succesfully get all wish", data: allWish });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

const editWish = async (req, res, next) => {
  const idWish = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedWish = await Wish.findByIdAndUpdate(
      idWish,
      {
        title,
        content,
        open,
        close,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Succesfully updated wish", data: updatedWish });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

const updateVisitDateWish = async (req, res, next) => {
  const idWish = req.params.id;
  try {
    const updatedWish = await Wish.findByIdAndUpdate(
      idWish,
      { $push: { visitDate: new Date() } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Succesfully updated wish", data: updatedWish });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

exports.createWish = createWish;
exports.getAllWish = getAllWish;
exports.editWish = editWish;
exports.updateVisitDateWish = updateVisitDateWish;
