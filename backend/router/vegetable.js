// routes/vegetableRoutes.js

import express from 'express';
import {createVegetable,getAllVegetables, getVegetableById, applyRemoveDiscount, editVegetable, removeVegeTable} from "../controller/vegetable.js"

const vegetableRouter = express.Router();

// Create a new vegetable
vegetableRouter.post('/create', createVegetable);

// update vegetable by ID
vegetableRouter.put('/edit/:id', editVegetable);

// remove vegetable by ID
vegetableRouter.delete('/remove/:id', removeVegeTable);

// Get all vegetables
vegetableRouter.get('/', getAllVegetables);

// Get vegetable by ID
vegetableRouter.get('/:id', getVegetableById);

// Apply or remove discount
vegetableRouter.post('/discount/:id', applyRemoveDiscount);

export default vegetableRouter;
