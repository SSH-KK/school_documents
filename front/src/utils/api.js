import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  responseType: "json",
  headers: {
    "Authorization": "Client-ID fe927209c970ad51a6428b2aee1e9e471bf8cd829cab3dc61470f89314e2a154",
  }
});