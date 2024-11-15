import express from "express";
const app = express();

app.listen(5000, () => {
  console.log("orders-service is running on Port 5000");
});
