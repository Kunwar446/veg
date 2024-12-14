// models/vegetableModel.js
import mongoose from 'mongoose';

const vegetableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePerKg: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  availableQuantity: { type: Number, required: true },
  discountPrice: { type: Number, default: null },
  discountExpiry: { type: Date, default: null },
  nutrients: { type: String },
  producedLocation: { type: String, required: true },
  category: { type: String, enum: ['vegetable', 'pesticide'], required: true },
  picture: { type: String, required: true }, // Cloudinary URL for the image
  createdAt: { type: Date, default: Date.now },
});

// Method to apply a discount
vegetableSchema.methods.applyDiscount = function (discountPrice, expiryDate) {
  this.discountPrice = discountPrice;
  this.discountExpiry = expiryDate;
  this.pricePerKg = discountPrice; // Set the price to discounted price
  return this.save();
};

// Method to remove discount
vegetableSchema.methods.removeDiscount = function () {
  this.discountPrice = null;
  this.discountExpiry = null;
  return this.save();
};

// Method to check if the discount has expired
vegetableSchema.methods.checkDiscountExpiry = function () {
  if (this.discountExpiry && new Date() > this.discountExpiry) {
    this.removeDiscount();
  }
};

const Vegetable = mongoose.model('Vegetable', vegetableSchema);

export default Vegetable;
