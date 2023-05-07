import axios from "axios";

const baseUrl = "http://localhost:3001/api/post";

const getAll = async () => {
    const { data } = await axios.get(`${baseUrl}`);
    return data;
}

const getOne = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
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

const addComment = async (id, token, comment) =>{
    return axios.put(`${baseUrl}/comment/${id}`, comment, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const addUp = async(postId, token) => {
    return axios.put(`${baseUrl}/up/${postId}`, null,  {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const addDown = async(postId, token) => {
    return axios.put(`${baseUrl}/down/${postId}`, null,  {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

export default {
    getAll,
    getOne,
    updatePost,
    createPost,
    addComment,
    addUp,
    addDown,
}