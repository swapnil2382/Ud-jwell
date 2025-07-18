const express = require("express");
const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllReviews).post(createReview);
router
  .route("/:reviewId")
  .get(getReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;
