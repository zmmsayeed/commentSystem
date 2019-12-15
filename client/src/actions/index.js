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
