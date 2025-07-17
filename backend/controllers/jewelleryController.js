const Jewellery = require("../models/jewelleryModel");
const AppError = require("../utils/appArror");

// Get all jewellery items
const getAllJewellery = async (req, res, next) => {
  try {
    const jewelleryItems = await Jewellery.find();

    if (!jewelleryItems || jewelleryItems.length === 0) {
      return next(new AppError("No jewellery items found", 404));
    }

    res.status(200).json({
      status: "success",
      numOfResults: jewelleryItems.length,
      data: jewelleryItems,
    });
  } catch (err) {
    next(err);
  }
};

// Get a single jewellery item by ID
const getJewellery = async (req, res, next) => {
  try {
    const jewellery = await Jewellery.findById(req.params.jewelleryId);

    if (!jewellery) {
      return next(new AppError("No jewellery item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: jewellery,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new jewellery item
const createJewellery = async (req, res, next) => {
  try {
    const {
      prodname,
      category,
      description,
      weights,
      metal,
      metalColour,
      gender,
      occasion,
      purity,
      filterLists,
      images,
      customizable,
      materialDescription,
    } = req.body;

    const newJewellery = await Jewellery.create({
      prodname,
      category,
      description,
      weights,
      metal,
      metalColour,
      gender,
      occasion,
      purity,
      filterLists,
      images,
      customizable,
      materialDescription,
    });

    res.status(201).json({
      status: "success",
      message: "Jewellery item created successfully",
      data: newJewellery,
    });
  } catch (err) {
    next(err);
  }
};

// Update a jewellery item by ID
const updateJewellery = async (req, res, next) => {
  try {
    const jewellery = await Jewellery.findByIdAndUpdate(
      req.params.jewelleryId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!jewellery) {
      return next(new AppError("No jewellery item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Jewellery item updated successfully",
      data: jewellery,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a jewellery item by ID
const deleteJewellery = async (req, res, next) => {
  try {
    const jewellery = await Jewellery.findByIdAndDelete(req.params.jewelleryId);

    if (!jewellery) {
      return next(new AppError("No jewellery item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Jewellery item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllJewellery,
  getJewellery,
  createJewellery,
  updateJewellery,
  deleteJewellery,
};
