import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

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
