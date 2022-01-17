import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const GET_ALL_CONTACT = ENDPOINT + "/get-contact";
const SAVE_CONTACT = ENDPOINT + "/save-contact";

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
