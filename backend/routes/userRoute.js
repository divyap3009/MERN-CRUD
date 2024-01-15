const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

// create
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdd = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdd);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// read
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// for single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allUsers = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//UPDATE
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
