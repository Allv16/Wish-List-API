const mongoose = require("mongoose");

const Wish = require("../Models/wish");

const createWish = async (req, res, next) => {
  const { title, content, open, close, offDay, region, gmaps, category } =
    req.body;
  try {
    const newWish = await Wish.create({
      title,
      content,
      open,
      close,
      offDay,
      region,
      gmaps,
      category,
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

const getWishCount = async (req, res, next) => {
  try {
    const counts = await Wish.aggregate([
      {
        $match: {
          category: { $in: ["Foods", "Drinks", "Places", "Snacks"] },
        },
      },
      {
        $group: {
          _id: "$category",
          totalCount: { $sum: 1 },
          visitDateCount: {
            $sum: {
              $cond: {
                if: { $gt: [{ $size: "$visitDate" }, 0] },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ]);

    const wishCount = counts.map(({ _id, totalCount, visitDateCount }) => ({
      category: _id,
      count: [totalCount - visitDateCount, visitDateCount],
    }));
    res.status(200).json({ status: "ok", count: wishCount });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

exports.createWish = createWish;
exports.getAllWish = getAllWish;
exports.editWish = editWish;
exports.updateVisitDateWish = updateVisitDateWish;
exports.getWishCount = getWishCount;
