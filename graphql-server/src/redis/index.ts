import { createClient } from "redis";
import jwt from "jsonwebtoken";
const client = createClient();
export async function verifyToken(jwtGraphqlToken: string) {
  try {
    const userId = jwt.verify(jwtGraphqlToken, process.env.jwt_secret);
    console.log("jwt verify ", userId);
    const userIdValue =
      typeof userId === "string" ? userId : JSON.stringify(userId);
    return userIdValue;
  } catch (error) {
    console.log("veerify token ", error);
    throw new Error("error while verifying token ");
  }
}
export async function addSessionOnRedis(jwtGraphqlToken: string) {
  try {
    const userId = jwt.verify(jwtGraphqlToken, process.env.jwt_secret);
    const userIdValue =
      typeof userId === "string" ? userId : JSON.stringify(userId);
    await client.set(jwtGraphqlToken, userIdValue);
    const checkSetvalue = await client.get(jwtGraphqlToken);
    console.log("check ", checkSetvalue);
    return userIdValue;
  } catch (error) {
    console.log("error addsession ", error);
    throw new Error("error while Adding session on redis ");
  }
}
export async function checkSessionOnRedis(jwtGraphqlToken: string) {
  try {
    const userId = await client.get(jwtGraphqlToken);
    return userId;
  } catch (error) {
    console.log("error in checksession on Redis ", error);

    throw new Error("errow while checking session on redis");
  }
}
export async function initializeCircuitBreaker(service) {
  try {
    await client.hSet(service, {
      state: "close",
      failure_count: 0,
      last_failureTime: Date.now(),
    });
  } catch (error) {
    console.log(
      "error in redis while setting circuit-breaker hset ",
      error.message
    );
    throw new Error(error.message);
  }
}
export default client;
