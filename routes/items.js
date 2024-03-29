const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Import the Item model

// Create item (POST)
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// retrieving items according to category and search :

router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query; // Extract query parameters

    // Build comprehensive filter object
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" }; // Case-insensitive search

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Additional routes for updating and deleting items can be added here:

// Patch route
router.patch("/:id", async (req, res) => {
  try {
    const updateData = req.body; // Get update data from request body
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
      }
    );
    if (!updatedItem) {
      return res.status(404).send("Item not found"); // Handle non-existent item
    }
    res.json(updatedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Generic error handling
  }
});

// Delete route
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send("Item not found"); // Handle non-existent item
    }
    res.json(deletedItem); // Send deleted item data (optional)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Generic error handling
  }
});

module.exports = router;
