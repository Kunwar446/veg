// controllers/vegetableController.js

import cloudinary from "cloudinary"

import Vegetable from "../model/vegetable.js"

// Create a new vegetable
export const createVegetable = async (req, res) => {
  try {
  

    const newVegetable = new Vegetable({
      name: req.body.name,
      pricePerKg: req.body.pricePerKg,
      availableQuantity: req.body.availableQuantity,
      nutrients: req.body.nutrients,
      category: req.body.category,
      producedLocation: req.body.producedLocation,
      picture: req.body.picture, // Save Cloudinary image URL
      discountPrice: req.body.discountPrice || null, // Set discountPrice
      discountExpiry: req.body.discountExpiry || null, // Set discountExpiry
    });

    await newVegetable.save();
    res.status(201).json(newVegetable);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vegetable', error });
  }
};


// update vegetable
export const editVegetable=async(req,res)=>{
  console.log(req.params.id)
  const { id } = req.params;
  const {
    name,
    pricePerKg,
    availableQuantity,
    producedLocation,
    nutrients,
    category,
    picture,
    discountPrice,
    discountExpiry,
  } = req.body;

  console.log(req.body)

  try {
    // Validate request data
    if (!name || !pricePerKg || !availableQuantity || !producedLocation || !category || !picture) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedVegetable = {
      name,
      pricePerKg,
      availableQuantity,
      producedLocation,
      nutrients,
      category,
      picture,
      discountPrice: discountPrice || null,
      discountExpiry: discountExpiry ? new Date(discountExpiry) : null,
    };

    const vegetable = await Vegetable.findByIdAndUpdate(id, updatedVegetable, { new: true });
    if (!vegetable) {
      return res.status(404).json({ error: "Vegetable not found" });
    }

    res.status(200).json({ message: "Vegetable updated successfully", vegetable });
  } catch (error) {
    console.error("Error updating vegetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



// delete  vegetable
export const removeVegeTable=async(req,res,next)=>{
  const removeId=req.params.id;
  try {
    // Check if the vegetable exists
    const vegetable = await Vegetable.findById(removeId);
    if (!vegetable) {
      return res.status(404).json({ message: "Vegetable not found" });
    }

    // Delete the vegetable
    await Vegetable.findByIdAndDelete({_id:removeId});

    res.status(200).json({ message: "Vegetable deleted successfully" });
  } catch (error) {
    console.error("Error deleting vegetable:", error);
    res.status(500).json({ message: "Failed to delete vegetable", error });
  }
}

// Get all vegetables
export const getAllVegetables = async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.status(200).json(vegetables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vegetables', error });
  }
};

// Get vegetable by ID
export const getVegetableById = async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    if (!vegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }
    res.status(200).json(vegetable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vegetable', error });
  }
};

// Apply or remove a discount
export const applyRemoveDiscount = async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    if (!vegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }

    if (req.body.discountPrice && req.body.expiryDate) {
      // Apply discount
      vegetable.applyDiscount(req.body.discountPrice, new Date(req.body.expiryDate));
    } else {
      // Remove discount
      vegetable.removeDiscount();
    }

    await vegetable.save();
    res.status(200).json(vegetable);
  } catch (error) {
    res.status(500).json({ message: 'Error applying/removing discount', error });
  }
};






















