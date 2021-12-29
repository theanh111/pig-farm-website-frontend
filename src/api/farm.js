import axios from "axios";
import { Config } from "../config";

// const LIVE_API = "http://103.173.154.237:8080";
// const LOCAL_API = "http://192.168.1.38:8080";

const LIVE_API = Config.baseAPI;
const LOCAL_API = "http://192.168.1.38:8080";

const ENDPOINT = LIVE_API;

const SAVE_FARM = ENDPOINT + "/save-farm";
const GET_ALL_FARM = ENDPOINT + "/get-farm";
const GET_FARM_BY_ID = ENDPOINT + "/get-farm-by-id/";

export const getFarmById = async (id) => {
    try {
        let data = await axios.get(GET_FARM_BY_ID + `${id}`);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getAllFarm = async () => {
    try {
        let data = await axios.get(GET_ALL_FARM);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const saveFarm = async (farm) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(SAVE_FARM, farm, {
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
