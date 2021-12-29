import axios from "axios";

import { Config } from "../config";

// const LIVE_API = "http://103.173.154.237:8080";
// const LOCAL_API = "http://192.168.1.38:8080";

const LIVE_API = Config.baseAPI;
const LOCAL_API = "http://192.168.1.38:8080";

const ENDPOINT = LIVE_API;

const GET_PIG_LIMIT_12 = ENDPOINT + "/get-pig-limit-12";
const GET_PIG_BY_ID = ENDPOINT + "/get-pig-by-id/";
const GET_PIG_BY_FARM_NAME = ENDPOINT + "/get-pig-by-farm-name";
const GET_ALL_PIG = ENDPOINT + "/get-pig";
const SAVE_PIG_IMPORT = ENDPOINT + "/save-pig-import";

export const savePigImport = async (arr_pig) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(SAVE_PIG_IMPORT, arr_pig, {
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

export const getAllPig = async () => {
    try {
        let data = await axios.get(GET_ALL_PIG);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getPigByFarmName = async (farm_name) => {
    try {
        let data = await axios.post(GET_PIG_BY_FARM_NAME, farm_name);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getPigById = async (id) => {
    try {
        let data = await axios.get(GET_PIG_BY_ID + `${id}`);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getPigLimit12 = async () => {
    try {
        let data = await axios.get(GET_PIG_LIMIT_12);
        return data;
    } catch (error) {
        return error.response;
    }
};
