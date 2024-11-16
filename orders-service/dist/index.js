"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderRoutes_1 = __importDefault(require("./router/orderRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/order-api", orderRoutes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "order api is working fine",
    });
});
app.listen(5000, () => {
    console.log("orders-service is running on Port 5000");
});
