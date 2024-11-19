import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import axios from "axios";
import { ApolloError, UserInputError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = dirname(__filename);
console.log(__dirname);

const typeDefs = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf-8"
);

const resolvers = {
  Query: {
    userDetails: async (_, args, { req }) => {
      try {
        const cookies = req.cookies;
        const jwtGraphqlToken = cookies["jwtGraphqlToken"];
        if (jwtGraphqlToken) {
          console.log("JWT GraphQL Token:", jwtGraphqlToken);
        } else {
          console.error("JWT GraphQL Token not found in cookies");
        }
        const res = await axios.post(
          "http://localhost:5002/user-api/user-details",
          { id: args.id }
        );
        return res.data.userDetails;
      } catch (error) {
        console.error("Error fetching user details:", error);
        throw new Error("Failed to fetch user details");
      }
    },
    allOrderDetails: async (_, args) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/order-api/all-order-details",
          {
            userId: args.userId,
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
  },
};
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4000/graphql",
  })
);
app.use(cookieParser());
app.use(
  "/graphql",
  bodyParser.json(),
  expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) })
);

app.get("/check", (req, res) => {
  res.json({ message: "Hi from Express server" });
});

// Start the Express server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
  console.log(`Express route is available at http://localhost:${PORT}/check`);
});
