const express = require("express")

const {
    getCart,
    editCart,
    emptyCart
} = require("../controllers/cartController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// Shoping Cart
// GET items in Cart
router.get("/cart", requireAuth, getCart)

// Edit the Cart
router.patch("/cart", requireAuth, editCart)

// Empty the Cart
router.patch("/cart/empty", requireAuth, emptyCart)


module.exports = router;