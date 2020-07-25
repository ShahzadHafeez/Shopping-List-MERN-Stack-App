const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// get all the items
router.get("/", (req, res) => {
  Item.find().then((items) => res.json(items));
});

// create a new item
router.post("/", (req, res) => {
  console.log("received create request");
  console.log(req.body);
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// delete an item
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(400).json({ success: false }));
});

module.exports = router;
