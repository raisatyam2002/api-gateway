import axios from "axios";
export async function getProductDetails(allProducts, fallbackMessages) {
  try {
    const res = await axios.get(process.env.product_api + "/all-product");
    if (res.data.success) {
      allProducts = res.data.products;
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log("error in product service ", error);
    fallbackMessages.push({
      service: "product-service",
      message:
        error.message || "An unexpected error occurred in the product service.",
      status: "DOWN", // Example: "DOWN", "TIMEOUT", or other relevant statuses
    });
  }
}
