const Wishlist = require("../models/wishlistModel");
const AppError = require("../utils/appArror");

// Get all wishlists
const getAllWishlists = async (req, res, next) => {
  try {
    const wishlists = await Wishlist.find();

    if (!wishlists || wishlists.length === 0) {
      return next(new AppError("No wishlists found", 404));
    }

    res.status(200).json({
      status: "success",
      numOfResults: wishlists.length,
      data: wishlists,
    });
  } catch (err) {
    next(err);
  }
};

// Get wishlist by user ID
const getWishlistById = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.params.userId,
    }).populate("items", "prodname images purity category");

    if (!wishlist) {
      return next(new AppError("No wishlist found for this user", 404));
    }

    res.status(200).json({
      status: "success",
      data: wishlist,
    });
  } catch (err) {
    next(err);
  }
};

// Create or update wishlist (add items)
const createOrUpdateWishlist = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      // Avoid duplicates
      if (wishlist.items.includes(productId)) {
        return next(new AppError("Item already in wishlist", 400));
      }
      wishlist.items.push(productId);
      await wishlist.save();
    } else {
      wishlist = await Wishlist.create({
        user: userId,
        items: [productId],
      });
    }

    wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items",
      "prodname images purity category"
    );

    res.status(200).json({
      status: "success",
      message: "Wishlist updated successfully",
      data: wishlist,
    });
  } catch (err) {
    next(err);
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return next(new AppError("Wishlist not found for this user", 404));
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.toString() !== productId
    );
    await wishlist.save();

    wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items",
      "prodname images purity category"
    );

    res.status(200).json({
      status: "success",
      message: "Item removed from wishlist",
      data: wishlist,
    });
  } catch (err) {
    next(err);
  }
};

// Delete entire wishlist
const deleteWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      user: req.params.userId,
    });

    if (!wishlist) {
      return next(new AppError("No wishlist found for this user", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Wishlist deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllWishlists,
  getWishlistById,
  createOrUpdateWishlist,
  removeFromWishlist,
  deleteWishlist,
};
