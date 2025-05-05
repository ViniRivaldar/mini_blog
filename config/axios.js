import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_AUTH
})
const axiosFotoUser = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_AUTH
})

export {axiosAuth, axiosFotoUser}