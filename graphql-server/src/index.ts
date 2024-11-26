import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import resolvers from "./resolver/index";
import client from "./redis/index";
import { register, Counter } from "prom-client";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
// const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
const __dirname = dirname(__filename);
console.log(__dirname);

const typeDefs = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf-8"
);

const app = express();
app.use(express.json());
const graphqlRequestCount = new Counter({
  name: "graphql_request_count",
  help: "Total number of GraphQL requests",
  labelNames: ["method", "route", "status_code"],
});
app.use((req, res, next) => {
  const startTime = Date.now();
  //   console.log("req body ", req.body);
  const graphqlOperation = req.body?.operationName || "Unknown Operation";
  //   const graphqlQuery = req.body?.query || "Unknown Query";
  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    const statusCode = res.statusCode;
    graphqlRequestCount.inc({
      method: req.method,
      route: graphqlOperation,
      status_code: res.statusCode,
    });
    console.log("GraphQL Operation:", graphqlOperation);
    console.log("Status Code:", statusCode);
    // console.log("GraphQL Query:", graphqlQuery);
  });
  next();
});
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      async requestDidStart() {
        return {
          async willSendResponse({ response }) {
            if (
              response.body.kind === "single" &&
              response.body.singleResult.errors
            ) {
              const errors = response.body.singleResult.errors;
              console.log("Errors:", errors);

              const firstError = errors[0];
              if (firstError.extensions.code === "UNAUTHENTICATED") {
                response.http.status = 401; // Unauthorized
              } else if (firstError.extensions.code === "FORBIDDEN") {
                response.http.status = 403; // Forbidden
              } else {
                response.http.status = 400; // Bad Request
              }
            } else {
              console.log("No errors in the response.");
            }
          },
        };
      },
    },
  ],
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
async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
      console.log(
        `Express route is available at http://localhost:${PORT}/check`
      );
    });
  } catch (error) {
    console.log("error while starting server ", error.message);
  }
}
startServer();
