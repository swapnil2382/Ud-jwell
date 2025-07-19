const express = require("express");
const {
  getAllWishlists,
  getWishlistById,
  createOrUpdateWishlist,
  removeFromWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllWishlists).post(createOrUpdateWishlist);
router.route("/:userId").get(getWishlistById).delete(deleteWishlist);
router.route("/:userId/:productId").delete(removeFromWishlist);

module.exports = router;
