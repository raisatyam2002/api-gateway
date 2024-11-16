import express from "express";
import productRouter from "./routes/productRoutes";
const app = express();
app.use(express.json());
app.use("/product-api", productRouter);
app.get("/", (req, res) => {
  res.json({
    message: "product api is working fine",
  });
});
app.listen(5001, () => {
  console.log("product-service is running on Port 5001");
});
