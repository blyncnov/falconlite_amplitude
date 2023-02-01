import axios from "axios";

// "https://documenter.getpostman.com/view/25225100/2s8ZDX32g8";

axios.defaults.baseURL = "https://falconlite.com/v1/api";

export const instance = axios.create();

export default instance;
