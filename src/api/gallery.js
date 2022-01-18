import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const SAVE_GALLERY = ENDPOINT + "/save-gallery";
const UPDATE_GALLERY = ENDPOINT + "/update-gallery";
const DELETE_GALLERY = ENDPOINT + "/delete-gallery";
const GET_ALL_GALLERY = ENDPOINT + "/get-gallery";

export const getAllGallery = async () => {
    try {
        let data = await axios.get(GET_ALL_GALLERY);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const saveGallery = async (gallery) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(SAVE_GALLERY, gallery, {
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

export const updateGallery = async (gallery) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_GALLERY, gallery, {
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

export const deleteGallery = async (gallery) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(DELETE_GALLERY, gallery, {
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
