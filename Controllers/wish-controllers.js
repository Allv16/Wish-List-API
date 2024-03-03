const mongoose = require("mongoose");

const Wish = require("../Models/wish");

const createWish = async (req, res, next) => {
  const { title, content, open, close, offDay, region, gmaps, category, tags } =
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
      tags,
      category,
    });
    res.status(200).json({ status: "ok", wish: newWish });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

const getAllWish = async (req, res, next) => {
  const region = req.query.region;
  const category = req.query.category;
  try {
    const allWish = await Wish.find({
      region: region,
      category: category,
      visitDate: { $exists: true, $size: 0 },
    });
    res.status(200).json({ status: "ok", wishes: allWish });
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
  const region = req.params.region;
  const categories = ["Foods", "Drinks", "Places", "Snacks"];

  try {
    const counts = await Wish.aggregate([
      {
        $match: {
          region: region,
          category: { $in: categories },
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

    let wishCount = categories.map((category) => {
      const categoryCount = counts.find(({ _id }) => _id === category);
      return {
        category: category,
        count: categoryCount
          ? [
              categoryCount.totalCount - categoryCount.visitDateCount,
              categoryCount.visitDateCount,
            ]
          : [0, 0],
      };
    });

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
