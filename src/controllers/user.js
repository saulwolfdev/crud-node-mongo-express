const User = require("../models/user");
const Car = require("../models/cars");
module.exports = {
  //GET DEFAULT
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },
  //POST
  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  },
  //GET ONLY USER
  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },
  //PUT ONLY USER
  updateUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const oldUser = User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },
  //DELETE
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    await User.findByIdAndRemove(userId);
    res.status(200).json({ success: true });
  },

  /////////////////////////////////CARS//////////////////

  getUsersCars: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cars")
    res.status(200).json(user);
  },
  newUserCar: async (req, res, next) => {
    const { userId } = req.params;
    const newCar = new Car(req.body);
    const user = await User.findById(userId);
    newCar.seller = user;
    await newCar.save();
    user.cars.push(newCar);
    await user.save();
    res.status(201).json(newCar);
  },
};
