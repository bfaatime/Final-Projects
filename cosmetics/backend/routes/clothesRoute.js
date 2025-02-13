const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware"); 
const ClothesModel = require("../models/ClothesModel"); // Model dosyanı buraya ekle

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const clothes = await ClothesModel.find();
        res.json(clothes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
