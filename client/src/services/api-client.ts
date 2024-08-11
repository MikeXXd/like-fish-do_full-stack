import axios from "axios";
import { LS_AUTH } from "../components/Users/constants";

let token = localStorage.getItem(LS_AUTH) || "";
if (token) {
  token = JSON.parse(token);
}

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "x-auth-token": token || ""
  }
});

// Function to update the token in the headers
const updateToken = () => {
  token = localStorage.getItem(LS_AUTH) || "";
  if (token) {
    token = JSON.parse(token);
  }
  apiClient.defaults.headers["x-auth-token"] = token || "";
};

// Listen for changes in the local storage
window.addEventListener("storage", (event) => {
  if (event.key === LS_AUTH) {
    updateToken();
  }
});

export default apiClient;
