import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const GET_ALL_CONTACT = ENDPOINT + "/get-contact";
const SAVE_CONTACT = ENDPOINT + "/save-contact";
const UPDATE_CONTACT = ENDPOINT + "/update-contact";
const DELETE_CONTACT = ENDPOINT + "/delete-contact";

export const getAllContact = async () => {
    try {
        let data = await axios.get(GET_ALL_CONTACT);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const saveContact = async (contact) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(SAVE_CONTACT, contact, {
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

export const updateContact = async (contact) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_CONTACT, contact, {
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

export const deleteContact = async (contact) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(DELETE_CONTACT, contact, {
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
