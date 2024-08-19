import axios from "axios";
var baseURL = "http://localhost:3000/api/";
var AXIOS_API = axios.create({
    baseURL: baseURL,
});
export default AXIOS_API;
