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

// GET all Items
router.get("/", getItems)

// GET a single item
router.get("/:id", getItem)

// POST a new item
router.post("/item", requireAuth, createItem)

// DELETE a item
router.delete("/:id", requireAuth, deleteItem)

// UPDATE a item
router.patch("/:id", requireAuth, updateItem)

module.exports = router;
