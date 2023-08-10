import Transfer from "../model/transfer.js";
import Product from "../model/product.js";
import Store from "../model/store.js";
import { NotifyTransfer } from "../function/socket-io.js";
export const createTransfer = async (req, res, next) => {
  const { from, to, date, product } = req.body;

  try {
    const barcodelist = product.map((item) => item.barcode);
    console.log(barcodelist);
    const transferProductList = await Product.find({
      barcode: { $in: barcodelist },
    }).select("_id barcode");
    console.log(transferProductList);
    const transferProduct = transferProductList.map((item) => {
      const finddata = product.find((e) => e.barcode === item.barcode);
      return {
        product: item._id,
        quantity: finddata.qty,
      };
    });
    const FromStore = await Store.findOne({ name: from });
    const ToStore = await Store.findOne({ name: to });
    const newTransfer = new Transfer({
      from: FromStore._id,
      to: ToStore._id,
      transferDate: date,
      products: transferProduct,
      status: "In Transit",
    });
    await newTransfer.save();
    console.log(ToStore.connectionID);

    NotifyTransfer(ToStore.connectionID, "Notification", "Success");
    res.status(200).json("success");
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
