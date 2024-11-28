import axios from "axios";
export async function getUserDetails(userId: any, data: any) {
  try {
    const res = await axios.post(process.env.user_api + "/user-details", {
      id: userId,
    });
    // console.log("res data ", res.data);
    if (res.data.success) {
      data.userData = res.data.userDetails;
      // console.log("userData ", data.userData);
    } else {
      throw new Error(res.data.message);
    }
  } catch (error: any) {
    console.log("error in getting user data ", error.message);
    data.fallbackMessages.push({
      service: "user-service",
      message:
        error.message || "An unexpected error occurred in the user service.",
      status: "DOWN",
    });
  }
}
