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
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => {
    res.json({
        message: "api working correctly",
    });
});
//@ts-ignore
userRouter.post("/userDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const userDetails = yield index_1.default.user.findUnique({
            where: {
                id: data.id,
            },
        });
        if (userDetails) {
            return res.status(201).json({
                success: true,
                message: "User details fecthed successfully",
                userDetails,
            });
        }
        else {
            return res.status(201).json({
                success: false,
                message: "User doesnot exist ",
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
exports.default = userRouter;
