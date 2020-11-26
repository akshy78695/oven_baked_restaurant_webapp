import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "react-redux-firebase";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const differenceBetweenDateInMinutes = (currentDate, Date) => {
    return (currentDate - Date) / 60000;
};

const Cart = ({ history }) => {
    const [subTotal, setSubTotal] = useState(0);
    const [timeDifferenceInOrder, setTimeDifferenceInOrder] = useState();
    const [
        goToCartAfterOrderCancelled,
        setGoToCartAfterOrderCancelled,
    ] = useState();

    const dispatch = useDispatch();

    const auth = useSelector(
        (state) => state.firebase.auth && state.firebase.auth
    );
    const cart = useSelector((state) => state.cart.pizzaInCart);
    console.log(cart);
    const order = useSelector(
        (state) => state.firestore && state.firestore.ordered.userOrder
    );
    console.log(order);
    const orderLoading = useSelector(
        (state) =>
            state.firestore && state.firestore.status.requesting.userOrder
    );
    const onGoToMenu = () => {
        dispatch({ type: "SET_MOVE_TO_MENU", payload: true });
        history.push("/");
    };
    const extraCheeseValue = useSelector(
        (state) => state.helper && state.helper.extraCheeseValue
    );

    const increaseQuantity = (id) => {
        dispatch({
            type: "INCREASE_PIZZA_QUANTITY",
            payload: { uniqueId: id },
        });
    };
    const decreaseQuantity = (id) => {
        dispatch({
            type: "DECREASE_PIZZA_QUANTITY",
            payload: {
                uniqueId: id,
            },
        });
    };
    const removeItemFromCart = (id) => {
        dispatch({
            type: "REMOVE_ITEM_FROM_CART",
            payload: {
                uniqueId: id,
            },
        });
    };
    const onCheckout = () => {
        if (auth.isLoaded && auth.isEmpty) {
            dispatch({
                type: "SET_ALERT",
                payload: { message: "Please sign-in first" },
            });
            dispatch({
                type: "SET_REDIRECT_TO_CART",
                payload: true,
            });
            history.push("/signin");
        }
        if (auth.isLoaded && !auth.isEmpty) {
            history.push("/delivery_info");
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);
    useEffect(() => {
        if (cart) {
            let subTotalPrice = 0;
            for (let i = 0; i < cart.length; i++) {
                subTotalPrice += parseInt(cart[i].totalPrice) * cart[i].times;
            }
            setSubTotal(subTotalPrice);
        }
        let totalBill = subTotal + parseFloat(subTotal * 0.05) + 30;
        dispatch({ type: "SET_TOTAL_BILL", payload: totalBill });
        if (order) {
            if (order.length > 0) {
                let timeDifference;
                timeDifference = differenceBetweenDateInMinutes(
                    new Date(),
                    order[0].paymentTime
                );
                setTimeDifferenceInOrder(parseInt(timeDifference));
                if (
                    (order[0].isCancelledByUser ||
                        order[0].isCancelledByRestaurant) &&
                    cart.length > 0
                ) {
                    setGoToCartAfterOrderCancelled(true);
                }
            }
        }
        //eslint-disable-next-line
    }, [cart, subTotal, order]);
    if (
        orderLoading === false &&
        order !== undefined &&
        order.length > 0 &&
        cart.length === 0 &&
        timeDifferenceInOrder < 60 &&
        !goToCartAfterOrderCancelled
    )
        return <Redirect to="/order" />;
    if (orderLoading === false)
        // if (cart && cart.length > 0)
        return (
            <div className="container">
                {isEmpty(cart) && (
                    <div style={{ marginTop: "30vh" }}>
                        <div className="text-center">
                            <img
                                src="https://img.icons8.com/emoji/96/000000/shopping-cart-emoji.png"
                                alt=""
                            />
                        </div>
                        <h2 className="text-center mt-4 mb-3">
                            Your cart is empty.
                        </h2>
                        <div className="text-center">
                            <button
                                className="btn btn-outline-dark text-center mt-3"
                                onClick={onGoToMenu}
                            >
                                Explore Menu
                            </button>
                        </div>
                    </div>
                )}
                {!isEmpty(cart) && cart.length > 0 && (
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-center h2 mt-5 align-items-center">
                                    <img
                                        src="https://img.icons8.com/pastel-glyph/30/000000/shopping-cart--v1.png"
                                        alt=""
                                    />
                                    <span className="align-middle ml-2">
                                        Cart
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-9">
                                <button
                                    className="btn btn-outline-info btn-sm float-right"
                                    onClick={onGoToMenu}
                                >
                                    Explore menu
                                </button>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9 px-md-0">
                                {cart.map((product) => (
                                    <div
                                        key={product.uniqueId}
                                        className="card mb-2 mx-md-3"
                                    >
                                        <div className="toast-body justify-content-between align-items-center d-flex row">
                                            <span className="col-md-7">
                                                <div className="media">
                                                    <img
                                                        src={product.imageURL}
                                                        width="80px"
                                                        height="80px"
                                                        className="mr-3"
                                                        alt="..."
                                                    />
                                                    <div className="media-body">
                                                        <h6 className="mt-0">
                                                            {product.name} X{" "}
                                                            {product.times}
                                                        </h6>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                            className="d-none d-lg-block"
                                                        >
                                                            {
                                                                product.description
                                                            }
                                                        </div>
                                                        <div className="text-muted">
                                                            {product.isRegular
                                                                ? "regular"
                                                                : product.size}
                                                            {product.extraCheese
                                                                ? ` | with extra cheese (₹${extraCheeseValue})`
                                                                : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                            <span className="col-md-5">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="float-right">
                                                            <div className="font-weight-bold">
                                                                ₹{" "}
                                                                {product.extraCheese
                                                                    ? (parseInt(
                                                                          product
                                                                              .price[
                                                                              product
                                                                                  .size
                                                                          ]
                                                                      ) +
                                                                          extraCheeseValue) *
                                                                      product.times
                                                                    : product
                                                                          .price[
                                                                          product
                                                                              .size
                                                                      ] *
                                                                      product.times}
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="float-right">
                                                            <div className="input-group input-group-sm">
                                                                {product.times ===
                                                                    1 && (
                                                                    <div
                                                                        className="input-group-prepend"
                                                                        onClick={() =>
                                                                            removeItemFromCart(
                                                                                product.uniqueId
                                                                            )
                                                                        }
                                                                    >
                                                                        <button className="btn btn-outline-dark btn-sm">
                                                                            -
                                                                        </button>
                                                                    </div>
                                                                )}
                                                                {product.times >
                                                                    1 && (
                                                                    <div
                                                                        className="input-group-prepend"
                                                                        onClick={() =>
                                                                            decreaseQuantity(
                                                                                product.uniqueId
                                                                            )
                                                                        }
                                                                    >
                                                                        <button className="btn btn-outline-dark btn-sm">
                                                                            -
                                                                        </button>
                                                                    </div>
                                                                )}
                                                                <input
                                                                    type="text"
                                                                    style={{
                                                                        width:
                                                                            "35px",
                                                                    }}
                                                                    value={
                                                                        product.times
                                                                    }
                                                                    readOnly
                                                                    className="form-control"
                                                                />
                                                                <div
                                                                    className="input-group-append"
                                                                    onClick={() =>
                                                                        increaseQuantity(
                                                                            product.uniqueId
                                                                        )
                                                                    }
                                                                >
                                                                    <button
                                                                        className="btn btn-outline-dark btn-sm"
                                                                        disabled={
                                                                            product.times >=
                                                                            10
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-lg-3 pl-lg-0 mt-md-3 mt-lg-0">
                                <hr className="d-block d-lg-none" />
                                <div className="card">
                                    <div
                                        className="card-body"
                                        style={{ fontFamily: "monospace" }}
                                    >
                                        <div className="h5">Price details</div>
                                        <div className="h6 d-flex justify-content-between align-items-center">
                                            Sub total
                                            <span className="">
                                                ₹{subTotal}
                                            </span>
                                        </div>
                                        <div className="h6 d-flex justify-content-between align-items-center">
                                            GST (5%)
                                            {subTotal !== 0 && (
                                                <span className="">
                                                    ₹
                                                    {parseFloat(
                                                        subTotal * 0.05
                                                    ).toFixed(1)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="h6 d-flex justify-content-between align-items-center">
                                            Discount
                                            <span className="">₹{0}</span>
                                        </div>
                                        <div className="h6 d-flex justify-content-between align-items-center">
                                            Delivary
                                            <span className="">₹{30}</span>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="h6 d-flex justify-content-between align-items-center">
                                            Total
                                            <span className="">
                                                ₹
                                                {subTotal +
                                                    parseFloat(
                                                        subTotal * 0.05
                                                    ) +
                                                    30}
                                            </span>
                                        </div>
                                        <div
                                            className="btn btn-info btn-block btn-sm mt-2"
                                            onClick={onCheckout}
                                        >
                                            Checkout
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    return (
        <div className="text-center" style={{ marginTop: "40vh" }}>
            <div className="spinner-border">
                <span className="sr-only">Loading</span>
            </div>
            <div className="mt-3 text-secondary">Loading cart</div>
        </div>
    );
};

export default Cart;
