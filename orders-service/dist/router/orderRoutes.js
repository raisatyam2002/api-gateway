"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../db/index"));
const orderRouter = (0, express_1.Router)();
orderRouter.get("/", (req, res) => {
    res.json({
        message: "api working correctly",
    });
});
//@ts-ignore
orderRouter.post("/all-order-details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        if (!userId) {
            return res.status(201).json({
                success: false,
                message: "userID doesnot exist ",
            });
        }
        const orderDetails = yield index_1.default.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                orderItems: true,
            },
        });
        if (orderDetails) {
            return res.status(201).json({
                success: true,
                message: "all Order details fecthed successfully",
                orderDetails,
            });
        }
        else {
            return res.status(201).json({
                success: false,
                message: "Orders doesnot exist ",
            });
        }
    }
    catch (error) {
        console.log("error ", error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
}));
//@ts-ignore
orderRouter.post("/order-details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    try {
        if (!orderId) {
            return res.status(201).json({
                success: false,
                message: "OrderId doesnot exist ",
            });
        }
        const orderDetails = yield index_1.default.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                orderItems: true,
            },
        });
        if (orderDetails) {
            return res.status(201).json({
                success: true,
                message: " Order details fetched successfully",
                orderDetails,
            });
        }
        else {
            return res.status(201).json({
                success: false,
                message: "Order doesnot exist ",
            });
        }
    }
    catch (error) {
        console.log("error ", error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
}));
exports.default = orderRouter;
