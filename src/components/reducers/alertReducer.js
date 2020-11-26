import { SET_ALERT, HIDE_ALERT } from "./types";

const initialState = {
    message: "",
    type: "",
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                message: payload.message,
                type: payload.type || "warning",
            };
        case HIDE_ALERT:
            return {
                ...state,
                message: "",
                type: "",
            };
        default:
            return state;
    }
};
