"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/product-api", productRoutes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "product api is working fine",
    });
});
app.listen(5001, () => {
    console.log("product-service is running on Port 5001");
});
