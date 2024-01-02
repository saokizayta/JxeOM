import { SET_SERVER_ERROR, SET_SHOW_UP, SET_STATE } from "../actions/types";

const initialState = {
    show: false,
    state: null,
    title: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_UP:
            return {
                ...state,
                show: !state.show,
            }
        default:
            return state;
    }
}