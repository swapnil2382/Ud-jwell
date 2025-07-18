const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    jewelleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jewellery",
      required: [true, "Review must be associated with a product"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: prevent duplicate reviews by same user on same product
reviewSchema.index({ userId: 1, jewelleryId: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userID",
    select: "fullname",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
