import express from "express";
import { getVegetableOrder, placeVegetableOrder, removeVegetableOrder, updateVegetableOrder,getAllVegetablesOrder } from "../controller/vegetableOrder.js";

const vegetableOrderRouter = express.Router();


vegetableOrderRouter.post("/create", placeVegetableOrder);
vegetableOrderRouter.get("/user/:user",getVegetableOrder);
vegetableOrderRouter.put("/user/update/:order",updateVegetableOrder)
vegetableOrderRouter.delete("/user/remove/:order",removeVegetableOrder);
vegetableOrderRouter.get("/all",getAllVegetablesOrder);
export default vegetableOrderRouter;