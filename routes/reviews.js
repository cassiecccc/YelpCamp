const express = require("express");
const router = express.Router({ mergeParams: true }); //* if id was defined in other router/path, need to mergeParams

const catchAsync = require("../utils/catchAsync");

const reviews = require("../controllers/reviews");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

// reviews route
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

// pull method, delete specific post
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

// delete reviews when deleting campground, middleware triggers certain function, see docs, see campground.js

module.exports = router;
