const Review = require("../models/reviewModel");
const AppError = require("../utils/appArror");

// CREATE Review
const createReview = async (req, res, next) => {
  try {
    const { userId, jewelleryId, rating, comment } = req.body;

    const existingReview = await Review.findOne({
      user: req.user._id,
      product: req.body.product,
    });

    if (existingReview) {
      return next(new AppError("You have already reviewed this product", 400));
    }

    let newReview = await Review.create({
      userId,
      jewelleryId,
      rating,
      comment,
    });

    newReview = await newReview.populate("userId", "fullname");

    res.status(201).json({
      status: "success",
      message: "Review created successfully",
      data: newReview,
    });
  } catch (err) {
    console.log(err);

    next(err);
  }
};

// GET All Reviews
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("userId", "fullname");

    if (reviews.length === 0) {
      return next(new AppError("No reviews found", 404));
    }

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

// GET Single Review
const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate("userId", "fullname email")
      .populate("jewelleryId", "prodname");
    console.log(review);

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE Review
const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Review updated successfully",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE Review
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
