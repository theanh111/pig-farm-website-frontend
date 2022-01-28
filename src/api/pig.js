import axios from "axios";

import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const GET_PIG_SPECIAL = ENDPOINT + "/get-pig-special";
const GET_PIG_LIMIT_12 = ENDPOINT + "/get-pig-limit-12";
const GET_PIG_BY_ID = ENDPOINT + "/get-pig-by-id/";
const GET_PIG_BY_FARM_NAME = ENDPOINT + "/get-pig-by-farm-name";
const GET_ALL_PIG = ENDPOINT + "/get-pig";
const GET_ALL_PIG_BY_FILTER = ENDPOINT + "/get-pig-by-filter";
const SAVE_PIG_IMPORT = ENDPOINT + "/save-pig-import";
const UPDATE_PIG = ENDPOINT + "/update-pig";
const DELETE_PIG = ENDPOINT + "/delete-pig";
const UPDATE_PIG_STATUS = ENDPOINT + "/update-pig-status";
const UPDATE_PIG_SPECIAL = ENDPOINT + "/update-pig-special";
const COUNT_PIG = ENDPOINT + "/count-pig";

export const countPig = async () => {
    try {
        let data = await axios.get(COUNT_PIG);
        return data;
    } catch (error) {
        return error.response;
    }
};

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

export const updatePig = async (pig) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_PIG, pig, {
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

export const deletePig = async (pig) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(DELETE_PIG, pig, {
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

export const updatePigStatus = async (pig) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_PIG_STATUS, pig, {
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

export const updatePigSpecial = async (pig_special) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_PIG_SPECIAL, pig_special, {
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

export const getPigSpecial = async () => {
    try {
        let data = await axios.get(GET_PIG_SPECIAL);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getPigByFilter = async (pig) => {
    try {
        let data = await axios.post(GET_ALL_PIG_BY_FILTER, pig);
        return data;
    } catch (error) {
        return error.response;
    }
};
