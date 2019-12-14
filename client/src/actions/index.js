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
