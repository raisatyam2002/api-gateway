import { ApolloError, UserInputError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import {
  addSessionOnRedis,
  verifyToken,
  checkSessionOnRedis,
} from "../redis/index";
import { isUserValid } from "../middleware/index";
import axios from "axios";

const resolvers = {
  Query: {
    userDetails: async (_, __, { req }) => {
      try {
        const userId = await isUserValid(req);
        if (!userId) {
          throw new Error("user not login....login again");
        }
        const res = await axios.post(
          "http://localhost:5002/user-api/user-details",
          { id: userId }
        );
        return res.data.userDetails;
      } catch (error) {
        console.error("Error fetching user details:", error);
        throw new Error("Failed to fetch user details");
      }
    },
    userDashboard: async (_, __, { req }) => {
      try {
        const userId = await isUserValid(req);
        if (!userId) {
          throw new Error("user not login....login again");
        }
        let userData;
        let allOrderDetails;
        let orderDetails;
        let allProducts;
        let fallbackmessages = [];
        // user micro-service
        try {
          const res = await axios.post(
            "http://localhost:5002/user-api/user-details",
            { id: userId }
          );
          if (res.data.success) {
            userData = res.data.user;
          } else {
            throw new Error(res.data.message);
          }
        } catch (error) {
          console.log("error in getting user data ", error);
          fallbackmessages.push({
            service: "user service",
            message: error.message,
          });
        }
        //order-microservice
        try {
          const res = await axios.post(
            "http://localhost:5000/order-api/all-order-details",
            {
              userId: userId,
            }
          );
          if (res.data.success) {
            allOrderDetails = res.data.orderDetails;
          } else {
            throw new Error(res.data.message);
          }
        } catch (error) {
          console.log("error in order service ", error);
          fallbackmessages.push({
            service: "order-service",
            message: error.message,
          });
        }
        //product-microservices
        try {
          const res = await axios.get(
            "http://localhost:5001/product-api/all-product"
          );
          if (res.data.success) {
            allProducts = res.data.products;
          } else {
            throw new Error(res.data.message);
          }
        } catch (error) {
          console.log("error in product service ", error);
          fallbackmessages.push({
            service: "product service",
            message: error.message,
          });
        }
      } catch (error) {
        console.log("error while gettting user dashboard details ", error);

        throw new ApolloError(
          "errro while getting user dashboard ",
          error.message
        );
      }
    },
  },
  Mutation: {
    userLogin: async (_, args, { res }) => {
      try {
        if (!args.email || !args.password) {
          throw new UserInputError("Please provide both email and password.");
        }

        const response = await axios.post(
          "http://localhost:5002/user-api/login",
          {
            email: args.email,
            password: args.password,
          }
        );
        console.log("userDetails ", response.data);

        if (response.data.success) {
          console.log("userDetails ", response.data.id);
          console.log("jwt secret ", process.env.jwt_secret);
          const token = jwt.sign(response.data.id, process.env.jwt_secret);
          console.log("jwt ", token);
          res.cookie("jwtGraphqlToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          await addSessionOnRedis(token);
          return response.data;
        } else {
          console.error("Login failed:", response.data.message);
          throw new ApolloError(response.data.message, "LOGIN_FAILED");
        }
      } catch (error) {
        if (error.response) {
          console.error("API error response:", error.response.data);
          throw new ApolloError(
            error.response.data?.message || "Server responded with an error",
            "API_ERROR"
          );
        } else if (error.request) {
          console.error("API error, no response received:", error.request);
          throw new ApolloError(
            "Unable to connect to the login server. Please try again later.",
            "NO_RESPONSE"
          );
        } else {
          console.error("Unexpected error:", error.message);
          throw new ApolloError(
            "An unexpected error occurred",
            "UNEXPECTED_ERROR"
          );
        }
      }
    },
    allOrderDetails: async (_, __, { req }) => {
      try {
        const userId = await isUserValid(req);
        console.log("userId ", userId);
        if (!userId) {
          throw new Error("user not login....login again");
        }
        const res = await axios.post(
          "http://localhost:5000/order-api/all-order-details",
          {
            userId: userId,
          }
        );
        return res.data.orderDetails;
      } catch (error) {
        console.error("Error fetching all Order details:", error);
        throw new Error("Failed to fetch Order details");
      }
    },
    orderDetails: async (_, args) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/order-api/order-details",
          {
            orderId: args.orderId,
          }
        );
        console.log(res.data.orderDetails);
        // console.log(res.data.orderDetails.orderItems);

        return res.data.orderDetails;
      } catch (error) {
        console.error("Error fetching all Order details:", error);
        throw new Error("Failed to fetch Order details");
      }
    },
    productDetails: async (_, args) => {
      try {
        const res = await axios.post(
          "http://localhost:5001/product-api/product-details",
          {
            prodId: args.prodId,
          }
        );
        if (res.data.success) {
          return res.data.productDetails;
        } else {
          console.error(res.data.message);
          return null;
        }
      } catch (error) {
        console.error("error while fetching product details");
        throw new Error("Failed to get product details");
      }
    },
  },
};

function withMiddleware(middleware, resolver) {
  return async (parent, args, context, info) => {
    try {
      await middleware(context.req, context.res);
      return resolver(parent, args, context, info);
    } catch (error) {
      throw error;
    }
  };
}
export default resolvers;
