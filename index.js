import { connectToDatabase } from "./function/database.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "socket.io";
import { verify } from "./middleware/authorize.js";
import BarcodeRoute from "./routes/Barcode.js";
import StockRoute from "./routes/Stock.js";
import StoreRoute from "./routes/StoreRoutes.js";
import TransferRoute from "./routes/TransferRoutes.js";
import OrderRoute from "./routes/OrderRoutes.js";
import CustomerRoute from "./routes/CustomerRoutes.js";
import {
  CheckBarcode,
  UpdatePrice,
  addProduct,
  deleteProduct,
} from "./function/updateBarcode.js";
import { socketConnection } from "./function/socket-io.js";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
connectToDatabase();
const router = express.Router();
// router.use(verify);
app.use("/barcode", BarcodeRoute);
app.use("/stock", StockRoute);
app.use("/store", StoreRoute);
app.use("/transfer", TransferRoute);
app.use("/order", OrderRoute);
app.use("/Customer", CustomerRoute);

const port = parseInt(process.env.PORT) || 7080;
const server = app.listen(port, () => {
  console.log(`helloworld: listening on http://localhost:${port}`);
});
socketConnection(server);
