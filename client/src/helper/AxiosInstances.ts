import axios from "axios";
import toast from "react-hot-toast";
import { API, TOKEN } from "../config";
import useStorage from "../hooks/useStorage";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getItem } = useStorage();
const token = getItem(TOKEN);

const AxiosInstances = axios.create({
  baseURL: API,
  headers: {
    Authorization: `${token ? `Bearer ${token}` : ""}`,
  },
});

AxiosInstances.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.success == "false") {
      let message = error.response.data.message;
      message ? toast.error(message) : toast.error("Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
    throw error;
  }
);

export default AxiosInstances;
