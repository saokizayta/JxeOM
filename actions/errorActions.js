import { GET_ERRORS } from "./types";

export const setError = (err) => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: err
    })
}