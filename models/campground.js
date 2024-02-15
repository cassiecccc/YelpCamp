const mongoose = require("mongoose");
const review = require("./review");
//*saved as a shortcut because need to reference it a lot later
const Review = require("./review");
const Schema = mongoose.Schema;

// mongo virtual property

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// delete query middleware

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews, // delete all the reviews that ids are in the doc
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
