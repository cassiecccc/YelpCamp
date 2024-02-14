const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

//* moved everything to MVC controllers

//* router.route group things together
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });

// router
//   .route("/")
//   .get(catchAsync(campgrounds.index))
//   .post(
//     isLoggedIn,
//     validateCampground,
//     catchAsync(campgrounds.createCampground)
//   );

// CAMPGROUND CRUD
router.get("/", catchAsync(campgrounds.index));

// create route, needs to go before /:id
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

//joi validation
router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// show route
router.get("/:id", catchAsync(campgrounds.showCampground));

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

// delete route
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
