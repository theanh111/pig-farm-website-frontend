import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const GET_USER_BY_USERNAME = ENDPOINT + "/get-user";

export const getUserByUsername = async (user) => {
    try {
        let data = await axios.post(GET_USER_BY_USERNAME, user);
        return data;
    } catch (error) {
        return error.response;
    }
};
