import axios from 'axios';
import {apiURL} from "./constants";

const axiosApp = axios.create({
    baseURL: apiURL
});

export default axiosApp;