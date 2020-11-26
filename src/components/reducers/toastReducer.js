import { SHOW_TOAST, HIDE_TOAST } from "./types";

const initialState = {
    pizzaInfo: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_TOAST:
            return {
                ...state,
                pizzaInfo: payload,
            };
        case HIDE_TOAST:
            return {
                ...state,
                pizzaInfo: {},
            };
        default:
            return state;
    }
};
