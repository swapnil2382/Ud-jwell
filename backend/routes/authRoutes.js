const express = require("express");

const { signUp, logIn, logOut , getMe} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/me", getMe);

module.exports = router;
