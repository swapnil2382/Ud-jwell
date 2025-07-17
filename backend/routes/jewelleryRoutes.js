const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllJewellery,
  getJewellery,
  createJewellery,
  updateJewellery,
  deleteJewellery,
} = require("../controllers/jewelleryController");

const router = express.Router();

router
  .route("/")
  .get(getAllJewellery)
  .post(protect, restrictTo("admin"), createJewellery);

router
  .route("/:jewelleryId")
  .get(getJewellery)
  .patch(protect, restrictTo("admin"), updateJewellery)
  .delete(protect, restrictTo("admin"), deleteJewellery);

module.exports = router;
