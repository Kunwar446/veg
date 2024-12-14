
import Vegetable from "../model/vegetable.js";
import vegetableOrder from "../model/vegetableOrder.js";

export const placeVegetableOrder = async (req, res, next) => {
  const { vegetableId, user, quantity } = req.body;

  try {
    const { vegetableId, quantity, user } = req.body;
    // Validate vegetable existence
    const vegetable = await Vegetable.findById(vegetableId);
    if (!vegetable) {
      return res.status(404).json({ message: "Vegetable not found" });
    }

    // Create the order
    const order = new vegetableOrder({
      vegetable: vegetableId,
      quantity,
      totalPrice: vegetable.pricePerKg * quantity,
      user: user._id
    });

    // Save the order to the database
    const savedOrder = await order.save();

    // Populate the vegetable and user fields in the saved order
    const populatedOrder = await vegetableOrder.findById(savedOrder._id)
      .populate('vegetable')  // Populate the vegetable field
      .populate('user');      // Populate the user field

    // Return the populated order
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
}


// Get Orders with Vegetable Details
export const getVegetableOrder = async (req, res) => {
  try {
    // console.log(req.params.user)
    const orders = await vegetableOrder.find({ user: req.params.user }).populate("vegetable").populate("user");

    res.json(orders);
    // console.log(orders)
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};


export const updateVegetableOrder = async (req, res) => {
  try {
    const { quantity } = req.body;
console.log(req.params.order)
    // Find the order to get the associated vegetable
    const order = await vegetableOrder.findById(req.params.order).populate("vegetable");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Recalculate the total price based on the new quantity and vegetable price
    const totalPrice = order.vegetable.pricePerKg * quantity;

    // Update the order with the new quantity and totalPrice
    const updatedOrder = await vegetableOrder.findByIdAndUpdate(
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


// remove order
export const removeVegetableOrder = async (req, res) => {
  try {
    await vegetableOrder.findByIdAndDelete(req.params.order);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
}













export const getAllVegetablesOrder=async(req,res,next)=>{
  try {
    const allVegetablesOrder=await vegetableOrder.find().populate('vegetable')
  .populate('user');
  res.status(201).json(allVegetablesOrder);

  } catch (error) {
    res.status(500).json({ message: "error while getting all ordered vegetables" });
  }
}