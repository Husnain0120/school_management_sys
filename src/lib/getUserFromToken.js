import jwt from "jsonwebtoken";

export const getUserFromToken = async (req) => {
  try {
    const token = req.cookies?.get("token")?.value || "";
    if (!token) {
      console.log("Token not found in request cookies");
      return;
    }

    if (!process.env.JWT_KEY) {
      console.log("JWT Token is missing ..");
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null; // Return null to indicate failure
  }
};
