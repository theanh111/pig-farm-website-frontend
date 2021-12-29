import axios from "axios";

import { Config } from "../config";

// const LIVE_API = "http://103.173.154.237:8080";
// const LOCAL_API = "http://192.168.1.38:8080";

const LIVE_API = Config.baseAPI;
const LOCAL_API = "http://192.168.1.38:8080";

const ENDPOINT = LIVE_API;

const GET_USER_BY_USERNAME = ENDPOINT + "/get-user";

export const getUserByUsername = async (user) => {
    try {
        let data = await axios.post(GET_USER_BY_USERNAME, user);
        return data;
    } catch (error) {
        return error.response;
    }
};
