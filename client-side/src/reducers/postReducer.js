const postReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case "FETCH_POSTS":
      return payload;
    case "UPDATE_POST":
      state = state?.map(post => post.id === payload.id ? payload : post);
    default:
      return state;
  }
};

export const fetchPosts = (content) => {
  return {
    type: 'FETCH_POSTS',
    payload: content,
  }
}

export const updatePost = (updatedPost) => {
  return {
    type: 'UPDATE_POST',
    payload: updatedPost,
  }
}



export default postReducer;