import express from "express";
import orderRouter from "./router/orderRoutes";
const app = express();
app.use(express.json());
app.use("/order-api", orderRouter);
app.get("/", (req, res) => {
  res.json({
    message: "order api is working fine",
  });
});
app.listen(5000, () => {
  console.log("orders-service is running on Port 5000");
});
