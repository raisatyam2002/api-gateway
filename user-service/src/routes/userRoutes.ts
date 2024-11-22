import { Router, Request, Response } from "express";
import db from "../db/index";
import { compare } from "bcryptjs";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({
    message: "api working correctly",
  });
});
//@ts-ignore
userRouter.post("/user-details", async (req, res) => {
  const { id } = req.body;
  try {
    const userDetails = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        addresses: true,
      },
    });
    if (userDetails) {
      return res.status(201).json({
        success: true,
        message: "User details fecthed successfully",
        userDetails,
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "User doesnot exist ",
      });
    }
  } catch (error) {
    console.log("error ", error);

    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
});
//@ts-ignore
userRouter.post("/login", async (req, res) => {
  console.log("debug");

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(201).json({
        success: false,
        message: "enter all details",
      });
    }
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("user ", user);

    if (user && user.password) {
      const userValidation = await compare(password, user.password);
      if (userValidation) {
        return res.status(201).json({
          success: true,
          message: "user details fetched successfully",
          user: user,
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "wrong password",
        });
      }
    } else {
      return res.status(201).json({
        success: false,
        message: "user does not exist",
      });
    }
  } catch (error) {
    console.log("error ", error);

    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

export default userRouter;
