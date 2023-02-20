import axios from "axios";

const baseUrl = "http://localhost:3001/api";

const getAll = () =>  {
    return axios.get(baseUrl)
}

const verifyEmail = async(email) => {
    return await axios.get(`${baseUrl}/verify-email?email=${encodeURIComponent(email)}`)
}

const verifyPassword = async(bodyReq) => {
    return  await axios.post(`${baseUrl}/verify-password`, bodyReq)
}

export default {
    getAll,
    verifyEmail,
    verifyPassword, 
}