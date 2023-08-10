import Product from "../model/product.js";
export const Updatebarcode = async (req, res, next) => {
  try {
    const barcode = await Product.find();
    //   const barcode = await prisma.stockProduct.findMany({});
    res.status(200).json(barcode);
  } catch (error) {}
};
