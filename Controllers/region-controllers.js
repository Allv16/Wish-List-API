const Region = require("../Models/region");

const createRegion = async (req, res, next) => {
  const { regions } = req.body;
  try {
    const newRegion = await Region.create({
      regions,
    });
    res.status(200).json({ status: "ok", regions: newRegion });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

const addRegion = async (req, res, next) => {
  const newRegion = req.params.region;
  try {
    const newRegions = await Region.findOneAndUpdate(
      {},
      { $push: { regions: newRegion } },
      { new: true }
    );

    res.status(200).json({ message: "ok", regions: newRegions.regions });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

const getAllRegion = async (req, res, next) => {
  try {
    const regions = await Region.findOne();

    res.status(200).json({ status: "ok", regions: regions.regions });
  } catch (e) {
    return next(new Error(e, 400));
  }
};

exports.createRegion = createRegion;
exports.addRegion = addRegion;
exports.getAllRegion = getAllRegion;
