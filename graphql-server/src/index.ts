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
import client, {
  addSessionOnRedis,
  verifyToken,
  checkSessionOnRedis,
} from "./redis/index";
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
