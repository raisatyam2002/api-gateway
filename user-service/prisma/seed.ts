import db from "../src/db/index";

import { hash, compare } from "bcryptjs";
const users = [
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

const addresses = [
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
const orders = [
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
const products = [
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
const orderItems = [
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

async function seedUser() {
  try {
    const hashedPassword = await hash("123456", 10);
    for (const u of users) {
      try {
        await db.user.upsert({
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
        });
        console.log(
          "✅ User with user email ",
          u.email,
          " created successfully"
        );
      } catch (error) {
        console.log("error while creating a user with email ", u.email, error);
      }
    }
    console.log("✅ user seed successfully ");
  } catch (error) {
    console.log("error while seeding user data ", error);
  }
}
async function seedAddresses() {
  try {
    for (const address of addresses) {
      try {
        await db.address.upsert({
          where: {
            id: `${address.userId}-${address.street}`, // Assuming a composite key
          },
          create: {
            street: address.street,
            city: address.city,
            country: address.country,
            userId: address.userId,
          },
          update: {},
        });
        console.log(
          "✅ Address for user ",
          address.userId,
          " created successfully"
        );
      } catch (error) {
        console.log(
          "❌ Error while creating an address for user ",
          address.userId,
          error
        );
      }
    }
    console.log("✅ Addresses seeded successfully");
  } catch (error) {
    console.log("❌ Error while seeding address data: ", error);
  }
}
async function seedProducts() {
  try {
    for (const product of products) {
      try {
        await db.product.upsert({
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
        });
        console.log("✅ Product ", product.name, " created successfully");
      } catch (error) {
        console.log("❌ Error while creating a product ", product.name, error);
      }
    }
    console.log("✅ Products seeded successfully");
  } catch (error) {
    console.log("❌ Error while seeding product data: ", error);
  }
}
async function seedOrders() {
  try {
    for (const order of orders) {
      try {
        await db.order.upsert({
          where: {
            id: order.id,
          },
          create: {
            id: order.id,
            userId: order.userId,
          },
          update: {},
        });
        console.log("✅ Order ", order.id, " created successfully");
      } catch (error) {
        console.log("❌ Error while creating an order ", order.id, error);
      }
    }
    console.log("✅ Orders seeded successfully");
  } catch (error) {
    console.log("❌ Error while seeding order data: ", error);
  }
}
async function seedOrderItems() {
  try {
    for (const orderItem of orderItems) {
      try {
        await db.orderItem.upsert({
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
        });
        console.log("✅ Order Item ", orderItem.id, " created successfully");
      } catch (error) {
        console.log(
          "❌ Error while creating an order item ",
          orderItem.id,
          error
        );
      }
    }
    console.log("✅ Order items seeded successfully");
  } catch (error) {
    console.log("❌ Error while seeding order item data: ", error);
  }
}

async function main() {
  await seedUser();
  await seedAddresses();
  await seedProducts();
  await seedOrders();
  await seedOrderItems();
}
main();
