const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campgrounds");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database is Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const randGen = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const newCampground = new Campground({
      author: "6805046d0ebb3bf4c648a869",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[randGen].city}, ${cities[randGen].state}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo quis unde consequuntur debitis rem voluptate asperiores dolor corrupti exercitationem. Veritatis consectetur dolor sequi doloremque, sapiente modi. Voluptatibus amet harum consequatur.",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[randGen].longitude, cities[randGen].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dagyxnnmu/image/upload/v1745944868/YelpCamp/mmwwygdep8hrqhrzge6h.jpg",
          filename: "YelpCamp/mmwwygdep8hrqhrzge6h",
        },
        {
          url: "https://res.cloudinary.com/dagyxnnmu/image/upload/v1745965925/YelpCamp/lbar0w02o3rmwgzjrlwm.jpg",
          filename: "YelpCamp/lbar0w02o3rmwgzjrlwm",
        },
        {
          url: "https://res.cloudinary.com/dagyxnnmu/image/upload/v1745979423/YelpCamp/rpwwtrzwhavnpy1rvkf3.avif",
          filename: "YelpCamp/rpwwtrzwhavnpy1rvkf3",
        },
      ],
    });
    await newCampground.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
