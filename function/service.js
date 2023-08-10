import Store from "../model/store.js";

export const storeConnect = async (name, id) => {
  try {
    await Store.updateOne(
      {
        name: name,
      },
      { connectionID: id }
    );
  } catch (error) {
    console.log(error);
  }
};

export const storeDisconnect = async (id) => {
  try {
    await Store.updateOne(
      {
        connectionID: id,
      },
      { connectionID: "" }
    );
  } catch (error) {
    console.log(error);
  }
};
