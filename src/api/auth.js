import axios from "axios";
import { Config } from "../config";

// const LIVE_API = "http://103.173.154.237:8080";
// const LOCAL_API = "http://192.168.1.38:8080";

const LIVE_API = Config.baseAPI;
const LOCAL_API = "http://192.168.1.38:8080";

const ENDPOINT = LIVE_API;

const LOGIN_URL = ENDPOINT + "/login";
const REGISTER_URL = ENDPOINT + "/register";
const CHECK_TOKEN_URL = ENDPOINT + "/check-token";

export const loginAPI = (user) => axios.post(LOGIN_URL, user);

export const checkToken = async (token) => {
    try {
        let data = await axios.post(CHECK_TOKEN_URL, token);
        return data;
    } catch (error) {
        return error.response;
    }
};
