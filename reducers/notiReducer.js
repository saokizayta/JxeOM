import { GET_NOTIFICATION, READ_NOTIFICATION, SET_NOTIFICATIONS } from "../actions/types";

const initialState = {
    notifications: [],
    count: 0,
    loginNote: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    {
                        ...action.payload,
                        read: false,
                    },
                    ...state.notifications
                ],
                count: state.count + 1,
            }
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
                count: action.payload.length
            }
        case READ_NOTIFICATION:
            var counter;
            return {
                ...state,
                notifications: state.notifications.map((note, index)=>{
                    if (index === action.payload) {
                        if (note.read) {
                            counter = 1
                        } else {
                            counter = -1
                        }
                        return {
                            ...note, read: !note.read,
                        }
                    }
                    return note
                }),
                count: state.count + counter,
            }
        default:
            return state;
    }
}