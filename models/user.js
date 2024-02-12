const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

// adding username and pw and salt field in schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
