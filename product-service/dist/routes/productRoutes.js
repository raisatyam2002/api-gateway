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
const productRouter = (0, express_1.Router)();
productRouter.get("/", (req, res) => {
    res.json({
        message: "api working correctly",
    });
});
//@ts-ignore
productRouter.post("/product-details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const productDetails = yield index_1.default.product.findUnique({
            where: {
                id: data.id,
            },
        });
        if (productDetails) {
            return res.status(201).json({
                success: true,
                message: "Product details fecthed successfully",
                productDetails,
            });
        }
        else {
            return res.status(201).json({
                success: false,
                message: "Product doesnot exist ",
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
exports.default = productRouter;
