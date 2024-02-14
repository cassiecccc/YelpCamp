const mongoose = require("mongoose");
const review = require("./review");
//*saved as a shortcut because need to reference it a lot later
const Review = require("./review");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  images: [{ url: String, filename: String }],
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
