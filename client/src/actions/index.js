export const registerUserTrigger = (data) => {
    return ({
        type: 'REGISTER_USER_TRIGGER', data
    })
};

export const registerUserResponse = (data) => {
    return ({
        type: 'REGISTER_USER_RESPONSE', data
    })
};

export const signinTrigger = (data) => {
    return ({
        type: 'SIGNIN_TRIGGER', data
    })
};

export const signinResponse = (data) => {
    return ({
        type: 'SIGNIN_RESPONSE', data
    })
};

export const logoutTrigger = (data) => {
    return ({
        type: 'LOGOUT_TRIGGER', data
    })
}

export const postPost = (data) => {
    return ({
        type: 'POST_POST', data
    })
}

export const postPostResponse = (data) => {
    return ({
        type: 'POST_POST_RESPONSE', data
    })
}

export const getPosts = (data) => {
    return ({
        type: 'GET_POSTS', data
    })
}

export const getPostsResponse = (data) => {
    return ({
        type: 'GET_POSTS_RESPONSE', data
    })
}

export const editPostTrigger = (data) => {
    return ({
        type: 'EDIT_POST_TRIGGER', data
    })
}

export const editPostResponse = (data) => {
    return ({
        type: 'EDIT_POST_RESPONSE', data
    })
}

export const postComment = (data) => {
    return ({
        type: 'POST_COMMENT', data
    })
}

export const postCommentResponse = (data) => {
    return ({
        type: 'POST_COMMENT_RESPONSE', data
    })
}

export const getComments = (data) => {
    return ({
        type: 'GET_COMMENTS', data
    })
}

export const getCommentsResponse = (data) => {
    return ({
        type: 'GET_COMMENTS_RESPONSE', data
    })
}

export const editCommentTrigger = (data) => {
    return ({
        type: 'EDIT_COMMENT_TRIGGER', data
    })
}

export const editCommentResponse = (data) => {
    return ({
        type: 'EDIT_COMMENT_RESPONSE', data
    })
}


