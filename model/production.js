import Product from "./product.js";
import pkg from "mongoose";
const { Schema, model, models } = pkg;

const StockSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: Product, required: true },
  quantity: { type: Number, required: true },
});

const ProductionSchema = new Schema({
  date: { type: Date, require: true },
  productionlist: [StockSchema],
});

const Production = models.Production || model("Production", ProductionSchema);

export default Production;
