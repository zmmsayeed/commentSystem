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
