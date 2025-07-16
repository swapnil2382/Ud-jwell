const User = require("../models/userModel");
const AppError = require("../utils/appArror");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return next(new AppError("No users found", 404));
    }

    res.status(200).json({
      status: "success",
      numOfResults: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(new AppError("No user found with that Id", 404));
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
