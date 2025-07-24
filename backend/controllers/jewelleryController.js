const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
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
// const createJewellery = async (req, res, next) => {
//   try {
//     const {
//       prodname,
//       category,
//       description,
//       weights,
//       metal,
//       metalColour,
//       gender,
//       occasion,
//       purity,
//       filterLists,
//       images, // base64 strings
//       customizable,
//       materialDescription,
//     } = req.body;

//     const imageUrls = [];

//     // Create the assets folder if it doesn't exist
//     const assetsPath = path.join(__dirname, "..", "assets");
//     if (!fs.existsSync(assetsPath)) {
//       fs.mkdirSync(assetsPath);
//     }

//     // Process each base64 image
//     images.forEach((base64String) => {
//       const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
//       if (!matches) return;

//       const mimeType = matches[1];
//       const base64Data = matches[2];
//       const extension = mimeType.split("/")[1];
//       const filename = `${uuidv4()}.${extension}`;
//       const filepath = path.join(assetsPath, filename);

//       fs.writeFileSync(filepath, Buffer.from(base64Data, "base64"));
//       const imageUrl = `${req.protocol}://${req.get("host")}/assets/${filename}`;
//       imageUrls.push(imageUrl);
//     });

//     // Create the jewellery document
//     const newJewellery = await Jewellery.create({
//       prodname,
//       category,
//       description,
//       weights,
//       metal,
//       metalColour,
//       gender,
//       occasion,
//       purity,
//       filterLists,
//       images: imageUrls,
//       customizable: customizable === "true",
//       materialDescription,
//     });

//     res.status(201).json({
//       status: "success",
//       message: "Jewellery item created successfully",
//       data: newJewellery,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const createJewellery = async (req, res, next) => {
  const savedFilenames = []; // Track saved image files

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
      images, // base64 strings
      customizable,
      materialDescription,
    } = req.body;

    const imageUrls = [];

    // Ensure the assets folder exists
    const assetsPath = path.join(__dirname, "..", "assets");
    if (!fs.existsSync(assetsPath)) {
      fs.mkdirSync(assetsPath);
    }

    // Process and store base64 images
    images.forEach((base64String) => {
      const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) return;

      const mimeType = matches[1];
      const base64Data = matches[2];
      const extension = mimeType.split("/")[1];
      const filename = `${uuidv4()}.${extension}`;
      const filepath = path.join(assetsPath, filename);

      fs.writeFileSync(filepath, Buffer.from(base64Data, "base64"));
      savedFilenames.push(filename); // Track filename for cleanup
      const imageUrl = `${req.protocol}://${req.get("host")}/assets/${filename}`;
      imageUrls.push(imageUrl);
    });

    // Create product in DB
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
      images: imageUrls,
      customizable: customizable === "true",
      materialDescription,
    });

    // Send success response
    res.status(201).json({
      status: "success",
      message: "Jewellery item created successfully",
      data: newJewellery,
    });
  } catch (err) {
    // Delete saved images if creation failed
    const assetsPath = path.join(__dirname, "..", "assets");
    savedFilenames.forEach((filename) => {
      const filepath = path.join(assetsPath, filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    });

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
