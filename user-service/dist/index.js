"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.get("/", (req, res) => {
    res.json({
        message: "cheking api",
    });
});
app.use("/userApi", userRoutes_1.default);
app.listen(5002, () => {
    console.log("user-service is running on Port 5002");
});
