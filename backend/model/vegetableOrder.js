import mongoose from "mongoose";

const vegetableOrderSchema = new mongoose.Schema({
    vegetable: { type: mongoose.Schema.Types.ObjectId, ref: "Vegetable", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming orders are linked to a user
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });

  const vegetableOrder = mongoose.model("vegetableOrder", vegetableOrderSchema);


  export default vegetableOrder;
