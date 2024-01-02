import { SET_CURRENT_USER, GET_USER_INFO, SET_NOTIFICATION } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case GET_USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    fcm_token: action.payload
                }
            }
        default:
            return state;
    }
}