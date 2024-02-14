const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

//* mongoose error handling

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("initial db connection successful");
  } catch (error) {
    handleError(error);
  }
};

dbConnection();

mongoose.connection.on("error", (err) => {
  logError(err);
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65caa7521d96b3bcd4693d8c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut perspiciatis ad iste veritatis. Eius totam nemo fugit laudantium sapiente similique maxime a distinctio pariatur ipsam aliquam id deleniti, sunt quam.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dfzvgewip/image/upload/v1707952904/YelpCamp/a7sir6tpafx2mz1xgoge.jpg",
          filename: "YelpCamp/a7sir6tpafx2mz1xgoge",
        },
        {
          url: "https://res.cloudinary.com/dfzvgewip/image/upload/v1707952904/YelpCamp/mxy4dasltgrplsov5xlo.jpg",
          filename: "YelpCamp/mxy4dasltgrplsov5xlo",
        },
        {
          url: "https://res.cloudinary.com/dfzvgewip/image/upload/v1707952904/YelpCamp/varp6rdpeqfn2jybiafq.webp",
          filename: "YelpCamp/varp6rdpeqfn2jybiafq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
