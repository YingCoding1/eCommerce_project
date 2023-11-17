import {actionType} from "../Helper";

const initState = {
    userData: null,
    failedMessage: null
}

export const loginReducer = (state = initState, action) => {
    // console.log('payload is', action?.payload)
    switch (action.type) {
        case actionType.FETCH_ALL_LOGIN:
            console.log('Fetch all login database', action.payload)
            return {...state, userData: action?.payload}
        case actionType.LOGIN_FAILED:
            return {...state, failedMessage: action?.payload }
        default:
            return state
    }
}
