import axios from "axios";
import { Config } from "../config";

const ENDPOINT = Config.baseAPI;

const GET_ALL_BLOG = ENDPOINT + "/get-blog";
const SAVE_BLOG = ENDPOINT + "/save-blog";
const UPDATE_BLOG = ENDPOINT + "/update-blog";
const DELETE_BLOG = ENDPOINT + "/delete-blog";
const GET_BLOG_BY_BLOG_CODE = ENDPOINT + "/get-blog-by-blog-code/";
const GET_ALL_BLOG_BY_FILTER = ENDPOINT + "/get-blog-by-filter";

export const getBlogByBlogCode = async (blogcode) => {
    try {
        let data = await axios.get(GET_BLOG_BY_BLOG_CODE + `${blogcode}`);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getAllBlog = async () => {
    try {
        let data = await axios.get(GET_ALL_BLOG);
        return data;
    } catch (error) {
        return error.response;
    }
};

export const getBlogByFilter = async (blog) => {
    try {
        let data = await axios.post(GET_ALL_BLOG_BY_FILTER, blog);
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

export const updateBlog = async (blog) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(UPDATE_BLOG, blog, {
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

export const deleteBlog = async (blog) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axios.post(DELETE_BLOG, blog, {
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
