const Item = require('../models/itemModel')
const mongoose = require('mongoose')

// get all Items
const getItems = async (req, res) => {
  const user_id = req.user?.user_id

  const item = await Item.find({user_id}).sort({createdAt: -1})

  res.status(200).json(item)
}

// get a single Item
const getItem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No such Item"})
  }

  const item = await Item.findById(id)

  if (!item){
    return res.status(400).json({ error: 'No such Item found' })
  }

  res.status(200).json(item)
}

// GET the newest item from both katagoris
const getNewItems = async (req, res) => {
  try {
    const newsetTShirt = await Item.findOne({ genre: "t-shirt" }).sort({ createdAt: -1 }).exec();
    const newestSweater = await Item.findOne({ genre: "sweater" }).sort({ createdAt: -1 }).exec();
    res.status(200).json({
      tShirt: newsetTShirt,
      sweater: newestSweater
    });
  } catch (error) {
    console.error((error));
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// GET based on category
const getCategory = async (req, res) => {
  const { category } = req.params
  try {
    const newSet = await Item.find({ genre: `${category}` }).sort({ createdAt: -1 }).exec();
    res.status(200).json({newSet})

  } catch (error) {
    console.error((error));
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// create new Item
const createItem = async (req, res) => {
  const { userId, description, name, genre, image } = req.body; // Adjusted to match the fields sent by the frontend

  let emptyFields = [];

  if (!userId) {
      emptyFields.push("userId");
  }
  if (!description) {
      emptyFields.push("description");
  }
  if (!name) {
      emptyFields.push("name");
  }
  if (!genre) {
      emptyFields.push("genre");
  }
  if (!image) {
      emptyFields.push("image");
  }
  if (emptyFields.length > 0) {
      return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to DB
  try {
      const item = await Item.create({ userId, description, name, genre, image });
      res.status(200).json(item);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


// deleta a Item
const deleteItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such Item"})
  }

  const item = await Item.findOneAndDelete({_id: id})

  if (!item) {
    return res.status(400).json({error: "No such item"})
  }

  res.status(200).json(item)
}

// update a Item
const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Item" });
  }

  const newItem = req.body.newItem;

  try {
    const item = await Item.findOneAndUpdate(
      { _id: id },
      { $set: newItem },
      { new: true } // This returns the updated document
    );

    if (!item) {
      return res.status(400).json({ error: "No such Item" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getItems,
  getItem,
  getNewItems,
  getCategory,
  createItem,
  deleteItem,
  updateItem,
}