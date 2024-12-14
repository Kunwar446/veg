import express from "express";
import { getPesticideOrder, placePesticeOrder, removePesticideOrder, updatePesticideOrder ,getAllPesticidesOrder} from "../controller/pesticideOrder.js";


const pesticideOrderRouter = express.Router();


pesticideOrderRouter.post("/create", placePesticeOrder);
pesticideOrderRouter.get("/user/:user",getPesticideOrder);
pesticideOrderRouter.put("/user/update/:order",updatePesticideOrder)
pesticideOrderRouter.delete("/user/remove/:order",removePesticideOrder);
pesticideOrderRouter.get("/all",getAllPesticidesOrder);
export default pesticideOrderRouter;