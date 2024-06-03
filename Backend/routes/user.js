const express = require("express")

// controller functions
const {
  user,
  loginUser,
  signupUser
} = require ("../controllers/userController")

const router = express.Router()

// get _id
router.post("/user", user)

// login route
router.post("/login", loginUser)

// signup route
router.post("/signup", signupUser)

module.exports = router