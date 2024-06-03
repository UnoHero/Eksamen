const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: "2h" })
}

// get _id of user
const user = async (req, res) => {
  const { userSearch } = req.body; 
  try {
    const foundUser = await User.findOne({ "userName": `${userSearch}` });

    if (!foundUser) {
      return res.status(400).json({ error: "No user with that name" });
    }

    res.status(200).json({ _id: foundUser._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


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
  const {userName, password} = req.body
  
  try {
    const user = await User.signup(userName, password)
    console.log(user);
    // create a token
    const token = createToken(user._id)

    res.status(200).json({userName, token})
  }catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { user, signupUser, loginUser }