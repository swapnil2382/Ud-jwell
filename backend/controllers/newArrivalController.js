const NewArrival = require('../models/newArrivalModel');
const AppError = require('../utils/appArror');
const catchAsync = require('../utils/catchAsync');

exports.getAllNewArrivals = catchAsync(async (req, res, next) => {
  const newArrivals = await NewArrival.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: newArrivals.length,
    data: {
      newArrivals,
    },
  });
});

exports.createNewArrival = catchAsync(async (req, res, next) => {
  const { imageUrl, altText, description, title } = req.body;

  if (!imageUrl || !altText || !description || !title) {
    return next(new AppError('All fields are required', 400));
  }

  const newArrival = await NewArrival.create({
    imageUrl,
    altText,
    description,
    title,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newArrival,
    },
  });
});

exports.updateNewArrival = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { imageUrl, altText, description, title } = req.body;

  const newArrival = await NewArrival.findByIdAndUpdate(
    id,
    { imageUrl, altText, description, title },
    { new: true, runValidators: true }
  );

  if (!newArrival) {
    return next(new AppError('No new arrival found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      newArrival,
    },
  });
});

exports.deleteNewArrival = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const newArrival = await NewArrival.findByIdAndDelete(id);

  if (!newArrival) {
    return next(new AppError('No new arrival found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});