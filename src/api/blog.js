import axios from "axios";
import { Config } from "../config";

const LIVE_API = Config.baseAPI;
const LOCAL_API = "http://192.168.1.38:8080";

const ENDPOINT = LIVE_API;

const GET_ALL_BLOG = ENDPOINT + "/get-blog";
const SAVE_BLOG = ENDPOINT + "/save-blog";

export const getAllBlog = async () => {
    try {
        let data = await axios.get(GET_ALL_BLOG);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const saveBlog = async (blog) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(SAVE_BLOG, blog, {
                headers: {
                    access_token: token,
                },
            });
            return data;
        }
    } catch (error) {
        return error.response;
    }
};
