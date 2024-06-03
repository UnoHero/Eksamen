const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: "3d" })
}

// login a user
const loginUser = async (req, res) => {
  const {userName, password} = req.body

  try {
    const user = await User.login(userName, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({userName, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {userName, password, passwordCheck} = req.body
  
  try {
    const user = await User.signup(userName, password, passwordCheck)
    console.log(user);
    // create a token
    const token = createToken(user._id)

    res.status(200).json({userName, token})
  }catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }