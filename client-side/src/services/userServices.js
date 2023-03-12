import axios from "axios";

const baseUrl = "http://localhost:3001/api/user";

const getOne = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
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

const sendEmail = async(bodyReq) => {
    return await axios.post(`${baseUrl}/confirm_email`, bodyReq)
}
const confirmEmail = async(bodyReq) => {
    return await axios.post(`${baseUrl}/confirm_code`, bodyReq)
}

const createNewUser = async (user) => {
    return await axios.post(`${baseUrl}`, user)
}

const login = async (bodyReq) => {
    return await axios.post(`${baseUrl}/login`, bodyReq);
}





const sendToken = async (token) => {
    return await axios.post(`${baseUrl}/verify-token`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}


export default {
    verifyEmail,
    verifyPassword,
    verifyUserName,
    sendEmail,
    confirmEmail,
    createNewUser,
    login,
    getOne,
    sendToken,
}