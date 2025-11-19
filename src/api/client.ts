import axios from "axios";
import type { AxiosInstance } from "axios"; 

const client: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://api-satudata.lampungtimurkab.go.id",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default client;
