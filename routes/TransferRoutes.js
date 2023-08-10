import express from "express";
import { createTransfer } from "../controller/Transfer.js";

const router = express.Router();

router.post("/createtransfer", createTransfer);

export default router;
