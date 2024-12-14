import mongoose from "mongoose";

const pesticideOrderSchema = new mongoose.Schema({
    pesticide: { type: mongoose.Schema.Types.ObjectId, ref: "Pesticide", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming orders are linked to a user
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });

  const PesticideOrder = mongoose.model("PesticideOrder", pesticideOrderSchema);


  export default PesticideOrder;
