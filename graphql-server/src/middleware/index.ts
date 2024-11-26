import {
  verifyToken,
  checkSessionOnRedis,
  addSessionOnRedis,
} from "../redis/index.js";
import { ApolloError, AuthenticationError } from "apollo-server-errors";
export async function isUserValid(req) {
  try {
    const cookies = req.cookies;
    const jwtGraphqlToken = cookies["jwtGraphqlToken"];
    if (!jwtGraphqlToken || !(await verifyToken(jwtGraphqlToken))) {
      throw new AuthenticationError("User not logged in");
    }
    let userId = await checkSessionOnRedis(jwtGraphqlToken);
    if (!userId) {
      userId = await addSessionOnRedis(jwtGraphqlToken);
    }
    if (!userId) {
      userId = await verifyToken(jwtGraphqlToken);
    }
    if (userId) return userId;
    else return null;
  } catch (error) {
    console.log("error in midddle ware ", error);
    throw new AuthenticationError(error.message);
  }
}
