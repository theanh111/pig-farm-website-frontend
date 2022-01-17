import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const SAVE_FARM = ENDPOINT + "/save-farm";
const UPDATE_FARM = ENDPOINT + "/update-farm";
const GET_ALL_FARM = ENDPOINT + "/get-farm";
const GET_FARM_BY_ID = ENDPOINT + "/get-farm-by-id/";
const GET_FARM_BY_FARM_CODE = ENDPOINT + "/get-farm-by-farm-code/";
const COUNT_FARM = ENDPOINT + "/count-farm";

export const getFarmByFarmCode = async (farmcode) => {
    try {
        let data = await axios.get(GET_FARM_BY_FARM_CODE + `${farmcode}`);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getFarmById = async (id) => {
    try {
        let data = await axios.get(GET_FARM_BY_ID + `${id}`);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const countFarm = async () => {
    try {
        let data = await axios.get(COUNT_FARM);
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

export const updateFarm = async (farm) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_FARM, farm, {
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
