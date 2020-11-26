import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import cuid from "cuid";
import Alert from "./Alert";

const PizzaToast = () => {
    const [selectValue, setSelectValue] = useState("small");
    const [cheeseCheckbox, setCheeseCheckbox] = useState(false);

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.firebase && state.firebase);
    const pizza = useSelector((state) => state.toast && state.toast.pizzaInfo);
    const alert = useSelector((state) => state.alert && state.alert);
    const { extraCheeseValue, productsNotRequireCheese } = useSelector(
        (state) => state.helper && state.helper
    );
    const cart = useSelector((state) => state.cart && state.cart.pizzaInCart);

    const addToCart = () => {
        try {
            console.log(Object.keys(pizza.price).length);
            let obj = { ...pizza };
            if (pizza.type === "veg") obj.isVeg = true;
            else if (pizza.type === "non-veg") obj.isVeg = false;
            obj.userUid = auth && auth.uid;
            obj.size = selectValue;
            obj.isRegular =
                Object.keys(pizza.price).length === 1 ? true : false;
            obj.times = 1;
            obj.uniqueId = cuid();
            if (
                productsNotRequireCheese &&
                productsNotRequireCheese.includes(obj.name)
            )
                obj.extraCheese = false;
            else obj.extraCheese = cheeseCheckbox;
            if (obj.extraCheese) {
                obj.totalPrice =
                    parseInt(obj.price[obj.size]) + extraCheeseValue;
            } else {
                obj.totalPrice = parseInt(obj.price[obj.size]);
            }
            //checking if already have in cart with same size
            if (cart && cart.length > 0) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].name === obj.name) {
                        if (cart[i].size === obj.size) {
                            throw Error(
                                "Already in cart! Increase quantity from cart or choose another size"
                            );
                        }
                    }
                }
            }
            // console.log(obj);
            dispatch({ type: "ADD_ITEM_TO_CART", payload: { ...obj } });
            dispatch({ type: "HIDE_TOAST" });
            dispatch({ type: "HIDE_ALERT" });
        } catch (error) {
            console.log(error);
            dispatch({
                type: "SET_ALERT",
                payload: { message: error.message },
            });
        }
    };
    const addExtraCheese = (e) => {
        setCheeseCheckbox(!cheeseCheckbox);
    };
    const totalValue = (price, name) => {
        price = parseInt(price);
        if (cheeseCheckbox) {
            if (!productsNotRequireCheese.includes(name))
                return price + extraCheeseValue;
        }

        return price;
    };
    const onClose = () => {
        dispatch({ type: "HIDE_TOAST" });
        if (alert && alert.message) {
            dispatch({ type: "HIDE_ALERT" });
        }
    };
    const onSelectChange = (e) => {
        setSelectValue(e.target.value);
        dispatch({ type: "HIDE_ALERT" });
    };
    return (
        <div className="row">
            <div className="col-md-5 ml-md-3">
                <div
                    className={`toast mx-auto p-0 border-dark w-100 ${
                        pizza && pizza.id ? "show" : "hide"
                    }`}
                    id="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{
                        position: "fixed",
                        bottom: "10px",
                    }}
                >
                    <div className="toast-header">
                        <strong className="mr-auto h4">Add to cart</strong>
                        <button
                            type="button"
                            className="ml-2 mb-1 close"
                            data-dismiss="toast"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        <div className="media">
                            <img
                                src={pizza && pizza.imageURL}
                                alt=""
                                width="100px"
                                height="100px"
                            />
                            <div className="media-body align-self-center ml-3 h5">
                                {pizza && pizza.name}
                            </div>
                        </div>
                        <div className="h6 ml-2 text-secondary">Sizes</div>
                        <div className="form-group">
                            <select
                                id=""
                                className="form-control"
                                value={selectValue}
                                onChange={onSelectChange}
                            >
                                {pizza && pizza.price && pizza.price.small ? (
                                    !pizza.price.medium ? (
                                        !pizza.price.large && (
                                            <option value="small">
                                                Regular
                                            </option>
                                        )
                                    ) : (
                                        <option value="small">Small</option>
                                    )
                                ) : null}
                                {pizza && pizza.price && pizza.price.medium && (
                                    <option value="medium">Medium</option>
                                )}
                                {pizza && pizza.price && pizza.price.large && (
                                    <option value="large">Large</option>
                                )}
                            </select>
                        </div>
                        <div className="h6 ml-2 text-secondary">
                            Price:{" "}
                            {pizza.price && (
                                <span>
                                    ₹
                                    {selectValue === "small" &&
                                        pizza.price.small}
                                    {selectValue === "medium" &&
                                        pizza.price.medium}
                                    {selectValue === "large" &&
                                        pizza.price.large}
                                </span>
                            )}
                        </div>
                        <hr className="my-1" />
                        {productsNotRequireCheese &&
                            !productsNotRequireCheese.includes(pizza.name) && (
                                <div className="form-check h6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        // value={true}
                                        checked={cheeseCheckbox}
                                        onChange={addExtraCheese}
                                        id="extraCheese"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="extraCheese"
                                    >
                                        Extra cheese {`(₹${extraCheeseValue})`}
                                    </label>
                                </div>
                            )}
                        {/* <div className="row">
                            <div className="col-md-12"></div>
                        </div> */}
                        {/* <div className="row">
                                <div className="col-md-12">
                                </div>
                            </div> */}
                        {alert && alert.message && (
                            <Alert message={alert.message} className="mb-0" />
                        )}
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="h6  ml-2 text-muted ">
                                Total:{" "}
                                {pizza.price && (
                                    <span>
                                        ₹
                                        {selectValue === "small" &&
                                            totalValue(
                                                pizza.price.small,
                                                pizza.name
                                            )}
                                        {selectValue === "medium" &&
                                            totalValue(
                                                pizza.price.medium,
                                                pizza.name
                                            )}
                                        {selectValue === "large" &&
                                            totalValue(
                                                pizza.price.large,
                                                pizza.name
                                            )}
                                    </span>
                                )}
                            </div>
                            <div
                                className="btn btn-outline-dark m-2 float-right"
                                onClick={addToCart}
                            >
                                Add
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaToast;
