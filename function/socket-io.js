import { Server } from "socket.io";
import { storeConnect, storeDisconnect } from "./service.js";
import {
  CheckBarcode,
  UpdatePrice,
  addProduct,
  deleteProduct,
} from "./updateBarcode.js";
let io;
export const socketConnection = (server) => {
  io = new Server(server);
  io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.on("connectToServer", (arg, callback) => {
      storeConnect(arg, socket.id);
      console.log(socket.id, "connected");
      console.log(arg); // "world"
      callback(socket.id);
    });
    socket.join(socket.request._query.id);
    socket.on("price", (data) => {
      UpdatePrice(data);
      socket.broadcast.emit("price", data);
    });
    socket.on("addSize", ({ data }) => {
      addProduct(data);
      socket.broadcast.emit("addProduct", data);
    });
    socket.on("deleteProduct", ({ data }) => {
      console.log(data);
      deleteProduct(data);
      socket.broadcast.emit("deleteProduct", data);
    });
    socket.on("addProduct", ({ data }) => {
      console.log(data);
      addProduct(data);
      socket.broadcast.emit("addProduct", data);
    });
    socket.on("disconnect", () => {
      storeDisconnect(socket.id);
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

export const NotifyTransfer = (id, key, data) => io.to(id).emit(key, data);
