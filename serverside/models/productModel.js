const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        description: { type: String, required: true, unique: true },
        category: { type: String, required: true }
    }
)

module.exports = mongoose.model("products", productSchema);