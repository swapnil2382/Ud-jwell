const express = require('express');
const newArrivalController = require('../controllers/newArrivalController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(newArrivalController.getAllNewArrivals)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    newArrivalController.createNewArrival
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    newArrivalController.updateNewArrival
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    newArrivalController.deleteNewArrival
  );

module.exports = router;