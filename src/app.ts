//configurar carpetas
import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.routes";
//initializatios
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(cors());
//para que las routas me entiendan formatos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//routes
app.use(authRouter);
app.get("/", (req, res) => {
  res.send("the api is here men ");
});

export default app;
