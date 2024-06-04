const express = require("express")

const {
    getItems,
    getItem,
    getNewItems,
    createItem,
    deleteItem,
    updateItem,
} = require("../controllers/itemController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// GET all Items
router.get("/", getItems)

// GET the newest item from both katagoris
router.get("/new", getNewItems)

// POST a new item
router.post("/item/add", requireAuth, createItem)

// GET a single item
router.get("/:id", getItem)

// DELETE a item
router.delete("/:id", requireAuth, deleteItem)

// UPDATE a item
router.patch("/:id", requireAuth, updateItem)

module.exports = router;
