// src/session.js
import axios from "axios";

export const checkSession = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/users/session-check",
      { withCredentials: true }
    );
    console.log("Session is active:", response.data);
    return response.data;
  } catch (error) {
    console.error("No active session:", error);
    return null;
  }
};
