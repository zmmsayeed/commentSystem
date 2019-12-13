const commentReducer = (state = {}, action) => {

    const newState = { ...state };
    switch (action.type) {
        case 'YOUR_ACTION_KEY_TO_TRIGGER_SAGA_API':
            return { ...newState, loading: true, isFetched: false }
            break
        case 'YOUR_ACTION_KEY_WHICH_WIIL_BE_TRIGGERED_BY_SAGA':
            return { ...newState, loading: false, isFetched: true, response: action.response, action: action.type }
            break
        default:
            return newState
            break
    }
};

export default commentReducer;