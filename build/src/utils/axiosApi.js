import axios from "axios";
const baseURL = "http://nirvana-2.vercel.app/api/";
const AXIOS_API = axios.create({
    baseURL,
});
export default AXIOS_API;
