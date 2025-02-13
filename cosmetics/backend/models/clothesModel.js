const mongoose = require("mongoose");

const ClothesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    raiting: { type: Number, default: 5 },
    oldPrice: { type: Number, default: null }
}, { timestamps: true });

const ClothesModel = mongoose.model("Clothes", ClothesSchema);

module.exports = ClothesModel;
