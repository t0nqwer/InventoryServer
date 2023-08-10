import Store from "../model/store.js";

export const CreateStore = async (req, res) => {
  const { name, address, description, status } = req.body;
  try {
    await Store.create({ name, address, description, status });
    res.status(200).json({ message: "Event Created" });
  } catch (error) {
    console.log(error);
  }
};

export const CreateEvent = async (req, res) => {
  const { name, address, description, status, event } = req.body;
  try {
    await Store.create({ name, address, description, status, event });
    res.status(200).json({ message: "Event Created" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateEvent = async (req, res) => {};

export const DeleteEvent = async (req, res) => {};

export const StoreList = async (req, res) => {
  try {
    const store = await Store.find({
      status: true,
    }).select("name");
    res.status(200).json(store);
  } catch (error) {
    console.log(error);
  }
};

export const StoreInfo = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await Store.findOne({ name });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Store Not Found" });
  }
};
