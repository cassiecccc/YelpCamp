const mongoose = require("mongoose");
//*saved as a shortcut because need to reference it a lot later
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
