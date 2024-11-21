import { NextFunction, Request, Response } from "express";
import {
  verifyToken,
  checkSessionOnRedis,
  addSessionOnRedis,
} from "../redis/index";
import { ApolloError } from "apollo-server-errors";
interface customRequest extends Request {
  userId: string;
}
export async function isUserValid(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = req.cookies;
    const jwtGraphqlToken = cookies["jwtGraphqlToken"];
    if (!jwtGraphqlToken || !(await verifyToken(jwtGraphqlToken))) {
      throw new ApolloError("User not logged in");
    }
    let userId = await checkSessionOnRedis(jwtGraphqlToken);
    if (!userId) {
      userId = await addSessionOnRedis(jwtGraphqlToken);
    }
    if (!userId) {
      userId = await verifyToken(jwtGraphqlToken);
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.log("error in midddle ware ", error);
    next(error);
  }
}
