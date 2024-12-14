import pesticideOrder from "../model/pesticideOrder.js";
import Pesticide from "../model/pesticide.js";
import PesticideOrder from "../model/pesticideOrder.js";

export const placePesticeOrder = async (req, res, next) => {
  const { pesticideId, user, quantity } = req.body;
  console.log(pesticideId, user, quantity);

  console.log("11111111111111111111111111111")

  try {
    // Validate pesticide existence
    console.log("2222222222222222222222222222222")
    const pesticide = await Pesticide.findById(pesticideId);
    console.log("3333333333333333333333333333333")
    if (!pesticide) {
      
      return res.status(404).json({ message: "Pesticide not found" });
    }

    

    // Create the order
    const order = new PesticideOrder({
      pesticide: pesticideId,
      quantity,
      totalPrice: pesticide.pricePerUnit * quantity,
      user: user._id
    });
    console.log("444444444444444444444")

    // Save the order to the database
    const savedOrder = await order.save();
    console.log("55555555555555555555555555")

    // Populate the pesticide and user fields in the saved order
    const populatedOrder = await PesticideOrder.findById(savedOrder._id)
      .populate('pesticide')
      .populate('user');
console.log("6666666666666666666666666")
    // Return the populated order
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};


// Get Orders with Pesticide Details
export const getPesticideOrder = async (req, res) => {
  try {
    const orders = await PesticideOrder.find({ user: req.params.user }).populate("pesticide").populate("user");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};


// Update Order (considering only pesticide)
export const updatePesticideOrder = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Find the order and populate the associated pesticide
    const order = await PesticideOrder.findById(req.params.order).populate("pesticide");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Recalculate the total price based on the new quantity and pesticide price
    const totalPrice = order.pesticide.pricePerUnit * quantity;

    // Update the order with the new quantity and totalPrice
    const updatedOrder = await PesticideOrder.findByIdAndUpdate(
      req.params.order,
      { quantity, totalPrice },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order" });
  }
};


// Remove order (remains the same)
export const removePesticideOrder = async (req, res) => {
  try {
    await PesticideOrder.findByIdAndDelete(req.params.order);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};


export const getAllPesticidesOrder=async(req,res,next)=>{
  try {
    const allPesticidesOrder=await PesticideOrder.find().populate('pesticide')
  .populate('user');
  res.status(201).json(allPesticidesOrder);

  } catch (error) {
    res.status(500).json({ message: "error while getting all ordered pesticides" });
  }
}