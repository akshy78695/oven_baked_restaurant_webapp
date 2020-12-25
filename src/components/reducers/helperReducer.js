const initialState = {
    moveToMenu: false,
    redirectToCart: false,
    redirectToAddress: false,
    extraCheeseValue: 40,
    address: null,
    totalBill: 0,
    changePasswordToken: null,
    GST: 0.12,
    deliveryCharge: 30,
    isAdmin: null,
    orderToRepeat: [],
    pizzaAdded: false,
    pickupByHimself: null,
    productsNotRequireCheese: [
        "Butterscotch Mousse Cake",
        "Cheese Jalapeno Dip",
        "Cheese Dip",
        "BROWNIE FANTASY",
        "Veg Parcel",
        "Crunchy Strips",
        "CRINKLE FRIES",
        "Lava Cake",
        "Chicken Parcel",
    ],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_MOVE_TO_MENU":
            return { ...state, moveToMenu: payload };
        case "SET_REDIRECT_TO_CART":
            return { ...state, redirectToCart: payload };
        case "SET_REDIRECT_TO_ADDRESS":
            return { ...state, redirectToAddress: payload };
        case "SET_ADDRESS":
            return { ...state, address: payload };
        case "SET_TOTAL_BILL":
            return { ...state, totalBill: payload };
        case "SET_CHANGE_PASSWORD_TOKEN":
            return { ...state, changePasswordToken: payload };
        case "SET_ADMIN":
            return { ...state, isAdmin: payload };
        case "SET_ORDER_TO_REPEAT":
            return { ...state, orderToRepeat: payload };
        case "SET_PIZZA_ADDED":
            return { ...state, pizzaAdded: payload };
        case "SET_PICKUP_BY_HIMSELF":
            return { ...state, pickupByHimself: payload };
        default:
            return state;
    }
};
