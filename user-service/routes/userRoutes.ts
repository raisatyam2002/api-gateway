import { Router, Request, Response } from "express";
import db from "../../db/index";
const userRouter = Router();

//@ts-ignore
userRouter.post("/userDetails", async (req, res) => {
  const data = req.body;
  try {
    const userDetails = await db.user.findUnique({
      where: {
        id: data.id,
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

export default userRouter;
