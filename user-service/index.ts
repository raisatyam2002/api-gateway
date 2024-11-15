import express from "express";
const app = express();
app.use(express.json());
import userRouter from "./routes/userRoutes";
app.use("/userApi", userRouter);
app.listen(5002, () => {
  console.log("user-service is running on Port 5002");
});
