import axios from "axios";
export async function getProductDetails(userId: string, data: any) {
  try {
    const res = await axios.get(process.env.product_api + "/all-product");
    if (res.data.success) {
      data.allProducts = res.data.products;
      console.log("product data ", data.allProducts);
    } else {
      throw new Error(res.data.message);
    }
  } catch (error: any) {
    console.log("error in product service ", error);
    data.fallbackMessages.push({
      service: "product-service",
      message:
        error.message || "An unexpected error occurred in the product service.",
      status: "DOWN", // Example: "DOWN", "TIMEOUT", or other relevant statuses
    });
  }
}
