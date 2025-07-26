const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
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
function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

const createJewellery = async (req, res, next) => {
  const savedFiles = [];

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
      newArrival
    } = req.body;

    const productSlug = slugify(prodname, { lower: true, strict: true });

    // Normalize customizable and newArrival
    const normalizedData = {
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
      customizable: customizable === 'yes' || customizable === true ? 'yes' : 'no',
      materialDescription,
      newArrival: newArrival === 'yes' || newArrival === true ? 'yes' : 'no',
      images: []
    };

    // Create the product instance and save it to generate _id
    const newJewellery = new Jewellery(normalizedData);

    await newJewellery.save();
    const productId = newJewellery._id.toString();

    // Ensure product image folder exists
    const assetsDir = path.join(__dirname, "..", "assets", "product");
    ensureFolderExists(assetsDir);

    const imageUrls = [];

    images.forEach((base64String, index) => {
      const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) return;

      const mimeType = matches[1];
      const base64Data = matches[2];
      const extension = mimeType.split("/")[1];

      const fileName = `${productId}_${productSlug}_${index + 1}.${extension}`;
      const filePath = path.join(assetsDir, fileName);

      fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
      savedFiles.push(filePath);

      const imageUrl = `${req.protocol}://${req.get("host")}/assets/product/${fileName}`;
      imageUrls.push(imageUrl);
    });

    // Update product with image URLs
    newJewellery.images = imageUrls;
    await newJewellery.save(); // Save updated images array

    res.status(201).json({
      status: "success",
      message: "Jewellery item created successfully",
      data: newJewellery,
    });
  } catch (err) {
    // Cleanup saved image files
    savedFiles.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    next(err);
  }
};

// Update a jewellery item by ID
const updateJewellery = async (req, res, next) => {
  try {
    const jewelleryId = req.params.jewelleryId;
    const updateData = req.body;

    console.log('Received PATCH data:', updateData); // Debug log

    // Normalize customizable and newArrival to strings
    if (updateData.customizable !== undefined) {
      updateData.customizable = updateData.customizable === 'yes' || updateData.customizable === true ? 'yes' : 'no';
    }
    if (updateData.newArrival !== undefined) {
      updateData.newArrival = updateData.newArrival === 'yes' || updateData.newArrival === true ? 'yes' : 'no';
    }

    // Update filterLists based on newArrival
    if (updateData.newArrival === 'yes' && !updateData.filterLists.includes('new arrivals')) {
      updateData.filterLists = [...updateData.filterLists, 'new arrivals'];
    } else if (updateData.newArrival === 'no') {
      updateData.filterLists = updateData.filterLists.filter(item => item !== 'new arrivals');
    }

    console.log('Processed PATCH data:', updateData); // Debug log

    const updatedJewellery = await Jewellery.findByIdAndUpdate(
      jewelleryId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedJewellery) {
      return next(new AppError("No jewellery item found with that ID", 404));
    }

    console.log('Updated jewellery:', updatedJewellery); // Debug log

    res.status(200).json({
      status: "success",
      message: "Jewellery item updated successfully",
      data: updatedJewellery,
    });
  } catch (err) {
    console.error('PATCH error:', err);
    next(err);
  }
};

// Delete a jewellery item by ID
const deleteJewellery = async (req, res, next) => {
  try {
    const { jewelleryId } = req.params;

    const jewellery = await Jewellery.findById(jewelleryId);

    if (!jewellery) {
      return next(new AppError("No jewellery item found with that ID", 404));
    }

    // Remove associated image files
    if (jewellery.images && jewellery.images.length > 0) {
      jewellery.images.forEach((imgUrl) => {
        const filename = imgUrl.split("/assets/product/")[1];
        if (filename) {
          const filepath = path.join(
            __dirname,
            "..",
            "assets",
            "product",
            filename
          );
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        }
      });
    }
    // Delete from DB
    await Jewellery.findByIdAndDelete(req.params.jewelleryId);

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