import axios from "axios";
import Product from "../model/product.js";
import pkg2 from "node-schedule";
import Production from "../model/production.js";
const { scheduleJob } = pkg2;
export const CheckBarcode = async () => {
  try {
    console.log(1);
    const response = await axios.get(
      // "https://khwanta-api2546.com/stock/stockdata"
      `${process.env.DASHBOARD_URL}/stock/stockdata`
    );
    const data = response.data.map((item) => ({
      barcode: item.barcode,
      cloth: item.cloth,
      size: item.size,
      code: item.code,
      name: item.name,
      fabric: item.fabric,
      sort: item.sort,
      price: +item.price,
      brand: item.brand,
    }));
    data.map(async (item) => {
      await Product.updateOne(
        { barcode: item.barcode },
        {
          cloth: item.cloth,
          size: item.size,
          code: item.code,
          name: item.name,
          fabric: item.fabric,
          sort: item.sort,
          price: +item.price,
          brand: item.brand,
        },
        { upsert: true }
      );
    });
  } catch (error) {
    console.log(error.message);
  }
};
scheduleJob("10 * * * *", () => CheckBarcode());
scheduleJob("20 * * * *", () => CheckBarcode());
scheduleJob("30 * * * *", () => CheckBarcode());
scheduleJob("40 * * * *", () => CheckBarcode());
scheduleJob("50 * * * *", () => CheckBarcode());
scheduleJob("0 * * * *", () => CheckBarcode());

export const UpdatePrice = async (item) => {
  try {
    await Product.updateMany(
      { barcode: { $in: item.barcode } },
      { price: +item.price }
    );
  } catch (error) {
    console.log(error);
  }
};
export const addProduct = async (item) => {
  try {
    const data = item.map((item) => ({
      barcode: item.barcode,
      cloth: item.cloth,
      size: item.size,
      code: item.code,
      name: item.name,
      fabric: item.fabric,
      sort: item.sort,
      price: +item.price,
      brand: item.brand,
    }));
    await Product.insertMany(data);
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (item) => {
  try {
    await Product.deleteMany({ barcode: { $in: item } });
    console.log(item, "Deleted");
  } catch (error) {
    console.log(error);
  }
};
