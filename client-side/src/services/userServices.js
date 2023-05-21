import axios from "axios";

const baseUrl = "http://localhost:3001/api/user";

const getOne = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}

const getAll = async() => {
    return await axios.get(`${baseUrl}`)
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

const updateUser = async(user) => {
    return await axios.put(`${baseUrl}/${user.id}`, user)
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

const sendFollow = async (id, token) => {
    return await axios.put(`${baseUrl}/follow/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const sendUnfollow = async (id, token) => {
    return await axios.put(`${baseUrl}/unfollow/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const sendMark = async (id, token) => {
    return await axios.put(`${baseUrl}/mark/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const sendUnmark = async (id, token) => {
    return await axios.put(`${baseUrl}/unmark/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const sendMessage = async (message, emails) => {
    const { data } = await axios.post(`${baseUrl}/send-message`, { message, emails })
    return data
}

const updateProfile = async(user, token) => {
    return axios.post(`${baseUrl}/update_profile`, user, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const updatePassword = async(user, token) => {
    return axios.post(`${baseUrl}/update_password`, user, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const changePassword = async(bodyReq) => {
    return axios.post(`${baseUrl}/change_password`, bodyReq)
}

const sendEmailForPassword = async(email) => {
    return axios.post(`${baseUrl}/forgetedpassword`, {email})
}

const deleteUser = async(token, id) => {
    return axios.delete(`${baseUrl}/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const deleteNotifications = async (token) => {
    return axios.post(`${baseUrl}/deletenotifications`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const addNotification = async (notification, token, userID) => {
    return axios.put(`${baseUrl}/add_notification/${userID}`, notification, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const verifyAccess = async (token) => {
    return await axios.post(`${baseUrl}/forget_password`, token)
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
    getAll,
    sendToken,
    sendFollow,
    sendUnfollow,
    sendMark,
    sendUnmark,
    sendMessage,
    updateUser,
    updateProfile,
    updatePassword,
    deleteUser,
    deleteNotifications,
    addNotification,
    changePassword,
    sendEmailForPassword,
    verifyAccess,
}