const express = require("express")

// controller functions
const {
  user,
  admin,
  loginUser,
  signupUser
} = require ("../controllers/userController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// get _id
router.post("/user", user)

// check if user is admin
router.post("/admin", requireAuth, admin)

// login route
router.post("/login", loginUser)

// signup route
router.post("/signup", signupUser)

module.exports = router