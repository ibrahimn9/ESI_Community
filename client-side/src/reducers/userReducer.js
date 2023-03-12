const userReducer = (state= {}, action) => {
    switch (action.type) {
      case 'NEW_USER':
        const { payload } = action;
        return payload
      default: 
        return state   
    }
}

export const createUser = (content) => {
    return {
        type: 'NEW_USER',
        payload: {
            name: content.name,
            email: content.email,
            password: content.password,
            class: content.class,
            pic: content.pic,
        }
    }
}

export default userReducer;