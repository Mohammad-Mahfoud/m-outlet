const mongoose = require("mongoose");
const { Schema, Types } = mongoose; // Import Schema and Types

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number, // Change type to Number for testing
    required: true,
    default: 0,
    validate: (val) => val >= 0, // Validation for non-negative quantity
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Types.Decimal128, // Assuming fixed decimal places
    required: true,
    validate: (val) => val > 0, // Validation for positive price
  },
  category: {
    type: String,
    required: true,
  },
  factory: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now }, // Automatic timestamps
  updatedAt: { type: Date, default: Date.now },
});

ItemSchema.index({ name: 1 });
ItemSchema.index({ category: 1 });
ItemSchema.index({ factory: 1 });

module.exports = mongoose.model("Item", ItemSchema);
