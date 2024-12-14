import express from 'express';
const pesticideRouter = express.Router();
import { createPesticide, getPesticides, getPesticideById, updatePesticide, deletePesticide } from "../controller/pesticide.js"

// Routes
pesticideRouter.post('/add', createPesticide);
pesticideRouter.get('/', getPesticides);
pesticideRouter.get('/:id', getPesticideById);
pesticideRouter.put('/edit/:id', updatePesticide);
pesticideRouter.delete('/remove/:id', deletePesticide);

export default pesticideRouter;