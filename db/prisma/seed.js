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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var bcryptjs_1 = require("bcryptjs");
var users = [
    { id: "1", name: "johnDoe", email: "john@gmail.com", password: "123456" },
    { id: "2", name: "janeSmith", email: "jane@gmail.com", password: "abcdef" },
    { id: "3", name: "aliceJones", email: "alice@gmail.com", password: "qwerty" },
    {
        id: "4",
        name: "bobBrown",
        email: "bob@gmail.com",
    },
    {
        id: "5",
        name: "charlieWhite",
        email: "charlie@gmail.com",
    },
    {
        id: "6",
        name: "daveBlack",
        email: "dave@gmail.com",
    },
];
var addresses = [
    {
        street: "hig 12 gautam nagar",
        city: "Bhopal",
        country: "India",
        userId: "1",
    },
    {
        street: "hig 34 new market",
        city: "Bhopal",
        country: "India",
        userId: "1",
    },
    { street: "12 Park Avenue", city: "New York", country: "USA", userId: "2" },
    {
        street: "456 Elm Street",
        city: "San Francisco",
        country: "USA",
        userId: "2",
    },
    { street: "Flat 203, Riverdale", city: "London", country: "UK", userId: "3" },
    { street: "10 Downing Street", city: "London", country: "UK", userId: "3" },
    { street: "12 Maple Drive", city: "Toronto", country: "Canada", userId: "4" },
    { street: "456 Oak Lane", city: "Montreal", country: "Canada", userId: "4" },
    {
        street: "Apartment 3A, Palm Residency",
        city: "Sydney",
        country: "Australia",
        userId: "5",
    },
    {
        street: "Villa 22, Blue Lagoon",
        city: "Melbourne",
        country: "Australia",
        userId: "5",
    },
    {
        street: "789 Spring Road",
        city: "Auckland",
        country: "New Zealand",
        userId: "6",
    },
    {
        street: "12 Rainbow Street",
        city: "Wellington",
        country: "New Zealand",
        userId: "6",
    },
];
var orders = [
    { id: "1", userId: "1" },
    { id: "2", userId: "1" },
    { id: "3", userId: "2" },
    { id: "4", userId: "2" },
    { id: "5", userId: "3" },
    { id: "6", userId: "3" },
    { id: "7", userId: "4" },
    { id: "8", userId: "4" },
    { id: "9", userId: "5" },
    { id: "10", userId: "5" },
    { id: "11", userId: "6" },
];
var products = [
    {
        id: "prod1",
        name: "iPhone 13 Pro",
        price: "999.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod2",
        name: "Samsung Galaxy S23",
        price: "899.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod3",
        name: "Google Pixel 7 Pro",
        price: "799.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod4",
        name: "OnePlus 11",
        price: "749.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod5",
        name: "Xiaomi Mi 13 Ultra",
        price: "699.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod6",
        name: "MacBook Air M2",
        price: "1199.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod7",
        name: "Dell XPS 13",
        price: "1299.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod8",
        name: "HP Spectre x360",
        price: "1399.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod9",
        name: "Lenovo ThinkPad X1 Carbon",
        price: "1499.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod10",
        name: "Asus ROG Zephyrus G14",
        price: "1599.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod11",
        name: "Microsoft Surface Laptop 5",
        price: "1099.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod12",
        name: "Realme GT 2 Pro",
        price: "599.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod13",
        name: "Huawei Mate X3",
        price: "1799.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod14",
        name: "Acer Swift 3",
        price: "899.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "prod15",
        name: "Samsung Galaxy Book3 Ultra",
        price: "1999.99",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
var orderItems = [
    {
        id: 1,
        productId: "prod1",
        orderId: "1",
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        productId: "prod2",
        orderId: "1",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        productId: "prod3",
        orderId: "2",
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        productId: "prod4",
        orderId: "2",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        productId: "prod5",
        orderId: "3",
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        productId: "prod6",
        orderId: "3",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 7,
        productId: "prod7",
        orderId: "4",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 8,
        productId: "prod8",
        orderId: "4",
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 9,
        productId: "prod9",
        orderId: "5",
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 10,
        productId: "prod10",
        orderId: "5",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 11,
        productId: "prod11",
        orderId: "6",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 12,
        productId: "prod12",
        orderId: "6",
        quantity: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 13,
        productId: "prod13",
        orderId: "7",
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 14,
        productId: "prod14",
        orderId: "7",
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 15,
        productId: "prod15",
        orderId: "8",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 16,
        productId: "prod1",
        orderId: "8",
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 17,
        productId: "prod2",
        orderId: "9",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 18,
        productId: "prod3",
        orderId: "9",
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 19,
        productId: "prod4",
        orderId: "10",
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 20,
        productId: "prod5",
        orderId: "10",
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
function seedUser() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, _i, users_1, u, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, (0, bcryptjs_1.hash)("123456", 10)];
                case 1:
                    hashedPassword = _a.sent();
                    _i = 0, users_1 = users;
                    _a.label = 2;
                case 2:
                    if (!(_i < users_1.length)) return [3 /*break*/, 7];
                    u = users_1[_i];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, index_1.default.user.upsert({
                            where: {
                                id: u.id,
                            },
                            create: {
                                id: u.id,
                                name: u.name,
                                email: u.email,
                                password: hashedPassword,
                            },
                            update: {},
                        })];
                case 4:
                    _a.sent();
                    console.log("✅ User with user email ", u.email, " created successfully");
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log("error while creating a user with email ", u.email, error_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    console.log("✅ user seed successfully ");
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    console.log("error while seeding user data ", error_2);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function seedAddresses() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, addresses_1, address, error_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, addresses_1 = addresses;
                    _a.label = 1;
                case 1:
                    if (!(_i < addresses_1.length)) return [3 /*break*/, 6];
                    address = addresses_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, index_1.default.address.upsert({
                            where: {
                                id: "".concat(address.userId, "-").concat(address.street), // Assuming a composite key
                            },
                            create: {
                                street: address.street,
                                city: address.city,
                                country: address.country,
                                userId: address.userId,
                            },
                            update: {},
                        })];
                case 3:
                    _a.sent();
                    console.log("✅ Address for user ", address.userId, " created successfully");
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log("❌ Error while creating an address for user ", address.userId, error_3);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("✅ Addresses seeded successfully");
                    return [3 /*break*/, 8];
                case 7:
                    error_4 = _a.sent();
                    console.log("❌ Error while seeding address data: ", error_4);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function seedProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, products_1, product, error_5, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, products_1 = products;
                    _a.label = 1;
                case 1:
                    if (!(_i < products_1.length)) return [3 /*break*/, 6];
                    product = products_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, index_1.default.product.upsert({
                            where: {
                                id: product.id,
                            },
                            create: {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                inStock: product.inStock,
                                createdAt: product.createdAt,
                                updatedAt: product.updatedAt,
                            },
                            update: {},
                        })];
                case 3:
                    _a.sent();
                    console.log("✅ Product ", product.name, " created successfully");
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.log("❌ Error while creating a product ", product.name, error_5);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("✅ Products seeded successfully");
                    return [3 /*break*/, 8];
                case 7:
                    error_6 = _a.sent();
                    console.log("❌ Error while seeding product data: ", error_6);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function seedOrders() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, orders_1, order, error_7, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, orders_1 = orders;
                    _a.label = 1;
                case 1:
                    if (!(_i < orders_1.length)) return [3 /*break*/, 6];
                    order = orders_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, index_1.default.order.upsert({
                            where: {
                                id: order.id,
                            },
                            create: {
                                id: order.id,
                                userId: order.userId,
                            },
                            update: {},
                        })];
                case 3:
                    _a.sent();
                    console.log("✅ Order ", order.id, " created successfully");
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _a.sent();
                    console.log("❌ Error while creating an order ", order.id, error_7);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("✅ Orders seeded successfully");
                    return [3 /*break*/, 8];
                case 7:
                    error_8 = _a.sent();
                    console.log("❌ Error while seeding order data: ", error_8);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function seedOrderItems() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, orderItems_1, orderItem, error_9, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, orderItems_1 = orderItems;
                    _a.label = 1;
                case 1:
                    if (!(_i < orderItems_1.length)) return [3 /*break*/, 6];
                    orderItem = orderItems_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, index_1.default.orderItem.upsert({
                            where: {
                                id: orderItem.id,
                            },
                            create: {
                                id: orderItem.id,
                                productId: orderItem.productId,
                                orderId: orderItem.orderId,
                                quantity: orderItem.quantity,
                                createdAt: orderItem.createdAt,
                                updatedAt: orderItem.updatedAt,
                            },
                            update: {},
                        })];
                case 3:
                    _a.sent();
                    console.log("✅ Order Item ", orderItem.id, " created successfully");
                    return [3 /*break*/, 5];
                case 4:
                    error_9 = _a.sent();
                    console.log("❌ Error while creating an order item ", orderItem.id, error_9);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("✅ Order items seeded successfully");
                    return [3 /*break*/, 8];
                case 7:
                    error_10 = _a.sent();
                    console.log("❌ Error while seeding order item data: ", error_10);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, seedUser()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, seedAddresses()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, seedProducts()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, seedOrders()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, seedOrderItems()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
