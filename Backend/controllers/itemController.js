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

// create new Item
const createItem = async (req, res) => {
  const {userID, description, name, type, image } = req.body

  let emptyFields = []

 
  if(!userID) {
    emptyFields.push("userID")
  }
  if(!description) {
    emptyFields.push("description")
  }
  if(!name) {
    emptyFields.push("name")
  }
  if(!type) {
    emptyFields.push("type")
  }
  if(!image) {
    emptyFields.push("image")
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields })
  }

  // add doc to DB
  try {
    const item = await Item.create({userID, description, name, type, image})
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

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
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such Item"})
  }

  const item = await Item.findOneAndUpdate({_id: id}, {body: req.body.newItem})

  if (!item) {
    return res.status(400).json({error: "no Such Item"})
  }

  res.status(200).json(item)
}

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
}