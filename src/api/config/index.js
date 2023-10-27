
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/"

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    console.log("erroAxios", error);
  },
);

export { api, URL };