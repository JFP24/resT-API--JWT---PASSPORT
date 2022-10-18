"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//configurar carpetas
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
//initializatios
const app = (0, express_1.default)();
//settings
app.set("port", process.env.PORT || 3000);
//middlewares
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
//para que las routas me entiendan formatos json
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//routes
app.use(auth_routes_1.default);
app.get("/", (req, res) => {
    res.send("the api is here men ");
});
exports.default = app;
