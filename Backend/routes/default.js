const express = require("express")

const {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem,
} = require("../controllers/itemController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// GET all quotes
router.get("/", getItems)

// GET a single post
router.get("/:id", getItem)

// POST a new quote
router.post("/", requireAuth, createItem)

// DELETE a quote
router.delete("/:id", requireAuth, deleteItem)

// UPDATE a quote
router.patch("/:id", requireAuth, updateItem)

module.exports = router;
