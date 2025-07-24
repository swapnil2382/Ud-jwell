const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appArror");

const generateAndSendToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie(process.env.JWT_COOKIE_NAME, token, {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

const signUp = async (req, res, next) => {
  try {
    const { fullname, email, password, passwordConfirm, phone } = req.body;

    if (!fullname || !email || !password || !passwordConfirm || !phone)
      return next(new AppError("Please provide all the fields.", 400));

    if (password !== passwordConfirm)
      return next(new AppError("Passwords are not the same.", 400));

    const newUser = await User.create({
      fullname,
      email,
      password,
      phone,
    });

    generateAndSendToken(res, newUser._id);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        _id: newUser._id,
        fullname: newUser.fullname,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect email or password.", 401));
    }

    generateAndSendToken(res, user._id);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        _id: user._id,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    const { jewelleryEcommerce } = req.cookies;

    if (jewelleryEcommerce) {
      token = jewelleryEcommerce;
    }

    if (!token) {
      return next(new AppError("Please log in to get access.", 401));
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user) {
      return next(new AppError("User doesn't exist."), 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not allowed to perform this action", 403)
      );
    }
    next();
  };

const logOut = (req, res) => {
  res.cookie(process.env.JWT_COOKIE_NAME, "", { maxAge: 0 });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const getMe = async (req, res, next) => {
  try {
    let token = req.cookies[process.env.JWT_COOKIE_NAME];

    if (!token) {
      return next(new AppError("Please log in to get access.", 401));
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select('fullname email phone');

    if (!user) {
      return next(new AppError("User doesn't exist.", 404));
    }

    res.status(200).json({
      status: "success",
      data: user
    });

  } catch (err) {
    console.error('Error in getMe:', err);
    next(err);
  }
};

module.exports = { signUp, logIn, logOut, protect, restrictTo, getMe };
