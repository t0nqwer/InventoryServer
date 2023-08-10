import Store from "../model/store.js";
import Product from "../model/product.js";
import Order from "../model/order.js";
import Transfer from "../model/transfer.js";
import Production from "../model/production.js";
import moment from "moment-timezone";
function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}
export const StockIn = async (req, res, next) => {
  try {
    const checkProduction = await Production.find({ date: req.body.time });
    if (checkProduction.length > 0)
      return res.status(200).json("import success");
    const barcodelist = req.body.sent.map((item) => item.barcode);
    const productlist = await Product.find({
      barcode: { $in: barcodelist },
    }).select("_id barcode");
    const store = await Store.findOne({ name: "สต๊อคศูนย์การเรียนรู้ขวัญตา" });
    const importdata = productlist.map((item) => {
      const finddata = req.body.sent.find((e) => e.barcode === item.barcode);
      return {
        product: item._id,
        quantity: finddata.importqty,
      };
    });
    const day = moment.tz(Date.now(), "Asia/Bangkok").format();
    console.log(day);

    importdata.map(async (item) => {
      const data = await Store.findOne({ _id: store._id }).select("stock");
      const check = data.stock.find(
        (e) => e.product.toString() === item.product.toString()
      );

      if (check) {
        await Store.updateOne(
          { _id: store._id, "stock._id": check._id },
          {
            $inc: {
              "stock.$.quantity": item.quantity,
            },
          }
        );
      } else {
        await Store.updateOne(
          { _id: store._id },
          {
            $push: {
              stock: {
                product: item.product,
                quantity: item.quantity,
              },
            },
          }
        );
      }
    });
    await Production.create({
      date: req.body.time,
      productionlist: importdata,
    });
    res.status(200).json("import success");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
