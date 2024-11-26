// import { ApolloError, UserInputError } from "apollo-server-errors";
// import {
//   verifyToken,
//   checkSessionOnRedis,
//   addSessionOnRedis,
// } from "./redis/index";
// import axios from "axios";
// import jwt from "jsonwebtoken";
// import { Response } from "express";
// export const resolvers = {
//   Query: {
//     userDetails: async (_, args:any, { req }:{req:any}) => {
//       try {
//         const cookies = req.cookies;
//         const jwtGraphqlToken = cookies["jwtGraphqlToken"];
//         if (!jwtGraphqlToken || !verifyToken(jwtGraphqlToken)) {
//           throw new ApolloError("User not logged in");
//         }
//         if (jwtGraphqlToken) {
//           console.log("JWT GraphQL Token:", jwtGraphqlToken);
//         } else {
//           console.error("JWT GraphQL Token not found in cookies");
//         }
//         const userId = await checkSessionOnRedis(jwtGraphqlToken);
//         if (userId) {
//           console.log("user exist on redis ", userId);
//         }

//         const res = await axios.post(
//           "http://localhost:5002/user-api/user-details",
//           { id: args.id }
//         );
//         return res.data.userDetails;
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         throw new Error("Failed to fetch user details");
//       }
//     },
//     allOrderDetails: async (_, args) => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/order-api/all-order-details",
//           {
//             userId: args.userId,
//           }
//         );

//         return res.data.orderDetails;
//       } catch (error) {
//         console.error("Error fetching all Order details:", error);
//         throw new Error("Failed to fetch Order details");
//       }
//     },
//     orderDetails: async (_, args:any) => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/order-api/order-details",
//           {
//             orderId: args.orderId,
//           }
//         );
//         console.log(res.data.orderDetails);
//         // console.log(res.data.orderDetails.orderItems);

//         return res.data.orderDetails;
//       } catch (error) {
//         console.error("Error fetching all Order details:", error);
//         throw new Error("Failed to fetch Order details");
//       }
//     },
//     productDetails: async (_, args:any) => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5001/product-api/product-details",
//           {
//             prodId: args.prodId,
//           }
//         );
//         if (res.data.success) {
//           return res.data.productDetails;
//         } else {
//           console.error(res.data.message);
//           return null;
//         }
//       } catch (error) {
//         console.error("error while fetching product details");
//         throw new Error("Failed to get product details");
//       }
//     },

//     userLogin: async (_, args, { res }:{res:Response}) => {
//       try {
//         if (!args.email || !args.password) {
//           throw new UserInputError("Please provide both email and password.");
//         }

//         const response = await axios.post(
//           "http://localhost:5002/user-api/login",
//           {
//             email: args.email,
//             password: args.password,
//           }
//         );
//         console.log("userDetails ", response.data);

//         if (response.data.success) {
//           console.log("userDetails ", response.data.id);
//           console.log("jwt secret ", process.env.jwt_secret);
//           const token = jwt.sign(response.data.id, process.env.jwt_secret||"");
//           await addSessionOnRedis(token);
//           console.log("jwt ", token);
//           res.cookie("jwtGraphqlToken", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 24 * 60 * 60 * 1000, // 1 day
//           });

//           return response.data;
//         } else {
//           console.error("Login failed:", response.data.message);
//           throw new ApolloError(response.data.message, "LOGIN_FAILED");
//         }
//       } catch (error:any) {
//         if (error.response) {
//           console.error("API error response:", error.response.data);
//           throw new ApolloError(
//             error.response.data?.message || "Server responded with an error",
//             "API_ERROR"
//           );
//         } else if (error.request) {
//           console.error("API error, no response received:", error.request);
//           throw new ApolloError(
//             "Unable to connect to the login server. Please try again later.",
//             "NO_RESPONSE"
//           );
//         } else {
//           console.error("Unexpected error:", error.message);
//           throw new ApolloError(
//             "An unexpected error occurred",
//             "UNEXPECTED_ERROR"
//           );
//         }
//       }
//     },
//   },
// };
