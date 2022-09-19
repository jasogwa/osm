import axios from "axios";

const URL = "http://localhost:5000/";

export const publicUrl = axios.create({
    baseURL: URL,
});