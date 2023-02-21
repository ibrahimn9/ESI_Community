import axios from "axios";

const baseUrl = "http://localhost:3001/api";

const getAll = () =>  {
    return axios.get(baseUrl)
}

const verifyEmail = async(email) => {
    return await axios.post(`${baseUrl}/verify-email?email=${encodeURIComponent(email)}`)
}

const verifyPassword = async(bodyReq) => {
    return  await axios.post(`${baseUrl}/verify-password`, bodyReq)
}

const verifyUserName = async(username) => {
    return await axios.post(`${baseUrl}/verify-username?username=${username}`)
}
export default {
    getAll,
    verifyEmail,
    verifyPassword,
    verifyUserName,
}