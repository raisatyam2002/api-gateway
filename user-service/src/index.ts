import express from "express";
const app = express();
app.use(express.json());
import userRouter from "./routes/userRoutes";
app.get("/", (req, res) => {
  res.json({
    message: "cheking api",
  });
});
app.use("/user-api", userRouter);
app.listen(5002, () => {
  console.log("user-service is running on Port 5002");
});
