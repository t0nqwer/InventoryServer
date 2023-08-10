import express from "express";
import {
  CreateEvent,
  CreateStore,
  StoreList,
  StoreInfo,
} from "../controller/Store.js";
const router = express.Router();

router.post("/create", CreateStore);
router.post("/createevent", CreateEvent);
router.get("/storelist", StoreList);
router.post("/getstoreinfo", StoreInfo);
export default router;
