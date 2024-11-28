import axios from "axios";
export async function getAllOrderDetails(userId: string, data: any) {
  try {
    const res = await axios.post(process.env.order_api + "/all-order-details", {
      userId: userId,
    });
    if (res.data.success) {
      data.allOrderDetails = res.data.orderDetails;
      console.log("all order details ", data.allOrderDetails);
    } else {
      throw new Error(res.data.message);
    }
  } catch (error: any) {
    console.log("error in order service ", error);
    data.fallbackMessages.push({
      service: "order-service",
      message:
        error.message || "An unexpected error occurred in the order service.",
      status: "DOWN", // Example: "DOWN", "TIMEOUT", or other relevant statuses
    });
  }
}
