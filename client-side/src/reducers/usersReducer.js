const usersReducer = (state= [], action) => {
    switch (action.type) {
      case 'FETCH_USERS':
        const { payload } = action;
        return payload
      default: 
        return state   
    }
}

export const fetchUsers = (content) => {
    return {
        type: 'FETCH_USERS',
        payload: content,
    }
}

export default usersReducer;