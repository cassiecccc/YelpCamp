const mongoose = require("mongoose");
//*saved as a shortcut because need to reference it a lot later
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
