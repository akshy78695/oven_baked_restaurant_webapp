const initialState = {
    pizzaInCart: [],
    totalBill: 0,
};
// {
//     description: "Goldern Corn, Black Olives, Capsicum & Red Paprika",
//     extraCheese: true,
//     times: 1,
//     id: "0z6diZs1kNU7kV1PRZ9M",
//     uniqueId: "cjld2cyuq0000t3rmniod1foy",
//     imageURL:
//         "https://firebasestorage.googleapis.com/v0/b/oven-baked-pizza-store.appspot.com/o/product_images%2FVEGGIE%20PARADISE.jpg?alt=media&token=a8ff5206-dea3-4784-89fd-134754552028",
//     name: "VEGGIE PARADISE",
//     price: { small: "60", large: "570", medium: "320" },
//     size: "small",
//     totalPrice: 190,
//     type: "veg",
// },
//if cart contains items in local storage
let cartLocalStorage = localStorage.getItem("cartLocalStorage");
if (cartLocalStorage) {
    let array = JSON.parse(cartLocalStorage);
    for (let i = 0; i < array.length; i++) {
        initialState.pizzaInCart.push(array[i]);
    }
}
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_ITEM_TO_CART":
            let array = [];
            let data = localStorage.getItem("cartLocalStorage");
            if (data) array = JSON.parse(data);
            else array = [];
            // array = JSON.parse(localStorage.getItem("cartLocalStorage")) || [];
            array.push(payload);
            localStorage.setItem("cartLocalStorage", JSON.stringify(array));
            return {
                ...state,
                pizzaInCart: [...state.pizzaInCart, payload],
            };
        case "REMOVE_ITEM_FROM_CART":
            let arrayForRemove = [];
            arrayForRemove =
                JSON.parse(localStorage.getItem("cartLocalStorage")) || [];
            arrayForRemove = arrayForRemove.filter(
                (pizza) => pizza.uniqueId !== payload.uniqueId
            );
            localStorage.setItem(
                "cartLocalStorage",
                JSON.stringify(arrayForRemove)
            );
            return {
                ...state,
                pizzaInCart: state.pizzaInCart.filter(
                    (pizza) => pizza.uniqueId !== payload.uniqueId
                ),
            };
        case "INCREASE_PIZZA_QUANTITY":
            let arrayForIncreasePizzaQuantity = [];
            arrayForIncreasePizzaQuantity =
                JSON.parse(localStorage.getItem("cartLocalStorage")) || [];
            arrayForIncreasePizzaQuantity = arrayForIncreasePizzaQuantity.filter(
                (product) =>
                    product.uniqueId === payload.uniqueId
                        ? (product.times += 1)
                        : product
            );
            localStorage.setItem(
                "cartLocalStorage",
                JSON.stringify(arrayForIncreasePizzaQuantity)
            );
            return {
                ...state,
                pizzaInCart: state.pizzaInCart.filter((product) =>
                    product.uniqueId === payload.uniqueId
                        ? (product.times += 1)
                        : product
                ),
            };
        case "DECREASE_PIZZA_QUANTITY":
            let arrayForDecreasePizzaQuantity = [];
            arrayForDecreasePizzaQuantity =
                JSON.parse(localStorage.getItem("cartLocalStorage")) || [];
            arrayForDecreasePizzaQuantity = arrayForDecreasePizzaQuantity.filter(
                (product) =>
                    product.uniqueId === payload.uniqueId
                        ? (product.times -= 1)
                        : product
            );
            localStorage.setItem(
                "cartLocalStorage",
                JSON.stringify(arrayForDecreasePizzaQuantity)
            );
            return {
                ...state,
                pizzaInCart: state.pizzaInCart.filter((product) =>
                    product.uniqueId === payload.uniqueId
                        ? (product.times -= 1)
                        : product
                ),
            };
        case "SET_CART":
            let dataFromLocal = localStorage.getItem("cartLocalStorage");
            if (dataFromLocal)
                localStorage.setItem(
                    "cartLocalStorage",
                    JSON.stringify(payload)
                );

            return {
                ...state,
                pizzaInCart: payload,
            };
        case "CLEAR_CART":
            localStorage.setItem("cartLocalStorage", []);
            return { ...state, pizzaInCart: [] };
        default:
            return state;
    }
};
