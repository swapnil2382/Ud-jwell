const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
