import Pesticide from "../model/pesticide.js";

// Create a new pesticide
export const createPesticide = async (req, res) => {
    try {
        const { name, formulation, targetPests, availableQuantity, pricePerUnit, picture, safetyDataSheet, regulatoryInformation } = req.body;

        // Validate input data
        // ... validation logic using express-validator

        const newPesticide = new Pesticide({
            name,
            // description,
            // activeIngredients,
            formulation,
            targetPests,
            availableQuantity,
            pricePerUnit,
            picture,
            safetyDataSheet,
            regulatoryInformation
        });

        const savedPesticide = await newPesticide.save();
        res.status(201).json(savedPesticide);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all pesticides
export const getPesticides = async (req, res) => {
    try {
        const pesticides = await Pesticide.find();
        res.json(pesticides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get a specific pesticide
export const getPesticideById = async (req, res) => {
    try {
        const pesticide = await Pesticide.findById(req.params.id);
        if (!pesticide) {
            return res.status(404).json({ msg: 'Pesticide not found' });
        }
        res.json(pesticide);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pesticide not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Update a pesticide
export const updatePesticide = async (req, res) => {
    try {
        const pesticide = await Pesticide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pesticide) {
            return res.status(404).json({ msg: 'Pesticide not found' });
        }
        res.json(pesticide);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pesticide not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Delete a pesticide
export const deletePesticide = async (req, res) => {
    try {
        const pesticide = await Pesticide.findByIdAndDelete(req.params.id);
        if (!pesticide) {
            return res.status(404).json({ msg: 'Pesticide not found' });
        }
        res.json({ msg: 'Pesticide removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pesticide not found' });
        }
        res.status(500).send('Server Error');
    }
};