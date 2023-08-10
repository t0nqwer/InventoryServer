import express from "express";
import { StoreList } from "../controller/Store.js";
import { StockIn } from "../controller/Stock.js";
const router = express.Router();

router.post("/StockIn", StockIn);
router.get("/StoreList", StoreList);
router.post("/StockOut");

export default router;
