import axios from "axios";

const baseUrl = "http://localhost:3001/api/post";

const getAll = async () => {
    const { data } = await axios.get(`${baseUrl}`);
    return data;
}

const createPost = async (post, token) => {
    return axios.post(`${baseUrl}`, post, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const updatePost = async (post) => {
    return await axios.put(`${baseUrl}/${post.id}`, post)
}


export default {
    getAll,
    updatePost,
    createPost,
}