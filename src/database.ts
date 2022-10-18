import mongoose from "mongoose";
import config from "./config/config";
//mongoose es la conexion a la base de datos
mongoose.connect(config.DB.URI);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection stablished");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});
