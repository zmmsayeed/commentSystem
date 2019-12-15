const commentReducer = (state = {}, action) => {

    const newState = { ...state };
    switch (action.type) {
        case 'REGISTER_USER_TRIGGER':
            return { ...newState, loading: true, isFetched: false }

        case 'REGISTER_USER_RESPONSE':
            newState.userLoggedIn = true;
            return { ...newState, loading: false, isFetched: true, response: action.json, action: action.type }

        case 'SIGNIN_TRIGGER':
            return { ...newState, loading: true, isFetched: false }

        case 'SIGNIN_RESPONSE':
            newState.userLoggedIn = true;
            return { ...newState, loading: false, isFetched: true, response: action.json, action: action.type }

        case 'LOGOUT_TRIGGER':
            newState.userLoggedIn = false
            return { ...newState, loading: false, isFetched: true, response: action.json, action: action.type }

        case 'POST_POST':
            return { ...newState, loading: true, isFetched: false }

        case 'POST_POST_RESPONSE':
            return { ...newState, loading: false, isFetched: true, postResponse: action.json, action: action.type }

        case 'GET_POSTS':
            return { ...newState, loading: true, isFetched: false }

        case 'GET_POSTS_RESPONSE':
            return { ...newState, loading: false, isFetched: true, posts: action.json, action: action.type }

        case 'EDIT_POST_TRIGGER':
            return { ...newState, loading: true, isFetched: false }

        case 'EDIT_POST_RESPONSE':
            return { ...newState, loading: false, isFetched: true, res: action.json, action: action.type }

        case 'POST_COMMENT':
            return { ...newState, loading: true, isFetched: false }

        case 'POST_COMMENT_RESPONSE':
            return { ...newState, loading: false, isFetched: true, commentResponse: action.json, action: action.type }

        default:
            return newState
    }
};

export default commentReducer;