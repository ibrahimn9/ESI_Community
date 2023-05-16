import axios from "axios";

const baseUrl = "http://localhost:3001/api/admin";

const getAdmin = async () => {
    const { data } = await axios.get(`${baseUrl}`);
    return data;
}

const sendReported = async (post, token) => {
    return axios.post(`${baseUrl}/addToPostsForCheck`, post,  {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const deletePost = async (postId) => {
    return axios.post(`${baseUrl}/deletePost`, postId)
}

const deleteUser = async (user, token) => {
    return axios.post(`${baseUrl}/deleteAccount`, user,  {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const sendNotification = async (message, token) => {
    return axios.post(`${baseUrl}/sendNotification`, message,  {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const login = async (admin) => {
    return await axios.post(`${baseUrl}/loginAdmin`, admin);
}

export default {
    getAdmin,
    sendReported,
    deletePost,
    deleteUser,
    sendNotification,
    login,
}