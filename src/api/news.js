import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const GET_ALL_NEWS = ENDPOINT + "/get-news";
const SAVE_NEWS = ENDPOINT + "/save-news";
const GET_NEWS_BY_NEWS_CODE = ENDPOINT + "/get-news-by-news-code/";

export const getNewsByNewsCode = async (newscode) => {
    try {
        let data = await axios.get(GET_NEWS_BY_NEWS_CODE + `${newscode}`);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getAllNews = async () => {
    try {
        let data = await axios.get(GET_ALL_NEWS);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const saveNews = async (news) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(SAVE_NEWS, news, {
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
