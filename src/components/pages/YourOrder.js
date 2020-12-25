import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useEffect } from "react";

const YourOrder = ({ history }) => {
    const dispatch = useDispatch();

    const {
        totalBill,
        address,
        extraCheeseValue,
        GST,
        deliveryCharge,
    } = useSelector((state) => state.helper && state.helper);
    const { cart, profile } = useSelector((state) => ({
        cart: state.cart && state.cart.pizzaInCart,
        profile: state.firebase.profile,
    }));
    const onChoosePayment = () => {
        if (profile.isDeliveryPerson) {
            document.getElementById("modalButton").click();
        } else {
            return history.push("/payment_option");
        }
    };
    const onPickupByDeliveryGuy = (payload) => {
        dispatch({ type: "SET_PICKUP_BY_HIMSELF", payload });
        return history.push("/payment_option");
    };
    useEffect(() => {
        if (totalBill === 0) {
            if (cart) {
                let total = 0;
                let subTotal = 0;
                for (let i = 0; i < cart.length; i++) {
                    subTotal += parseInt(cart[i].totalPrice) * cart[i].times;
                }
                total = subTotal + parseFloat(subTotal * GST) + deliveryCharge;
                dispatch({ type: "SET_TOTAL_BILL", payload: total });
            }
        }
        //eslint-disable-next-line
    }, [totalBill, cart]);
    if (cart && cart.length > 0 && address) {
        if (true) {
            return (
                <div className="container" style={{ marginTop: "60px" }}>
                    <div className="row">
                        <div className="col-md-7 mx-2 mx-md-auto bg-white">
                            <div className="mx-3 my-3 h4 ">
                                <span>Your Order</span>
                                <span className="float-right">
                                    <Link to="/cart">
                                        <button className="btn btn-outline-dark btn-sm">
                                            Go to cart
                                        </button>
                                    </Link>
                                </span>
                            </div>
                            {cart &&
                                cart.map((product) => (
                                    <div
                                        key={product.uniqueId}
                                        className="card mb-2 mx-md-3"
                                    >
                                        <div className="card-body">
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
                                                            fontSize: "13px",
                                                        }}
                                                        className="d-none d-lg-block"
                                                    >
                                                        {product.description}
                                                    </div>
                                                    <div className="text-muted">
                                                        {product.size}{" "}
                                                        {product.extraCheese
                                                            ? `I with extra cheese (₹${extraCheeseValue})`
                                                            : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            <div className="float-right mr-4">
                                <span className="h5">Total: </span>
                                <span className="h5 text-muted">
                                    ₹ {totalBill && totalBill}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 mx-auto bg-white">
                            <div className="ml-3 h4">Deliver to:</div>
                            {address && (
                                <div className="card mb-2 mx-md-3">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-md-12 d-flex justify-content-between align-items-center">
                                                <span className="h5">
                                                    {address.name}
                                                </span>
                                                <Link to="/delivery_info">
                                                    <span className="btn btn-sm btn-primary">
                                                        Change
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr className="mt-0" />
                                        <div className="mb-2">
                                            <label
                                                className="h6 mr-2"
                                                htmlFor="full_address"
                                            >
                                                Full Address:{" "}
                                            </label>
                                            <span
                                                name="full_address"
                                                className="h6 text-secondary"
                                            >
                                                {address.street},{address.city},
                                                {address.state}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                className="h6 mr-2"
                                                htmlFor="pin_code"
                                            >
                                                zip code:{" "}
                                            </label>
                                            <span
                                                name="pin_code"
                                                className="h6 text-secondary"
                                            >
                                                {address.zip_code}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="text-center mb-4 mx-2 mx-md-3">
                                <button
                                    className="btn btn-block btn-outline-dark"
                                    onClick={onChoosePayment}
                                >
                                    Choose Payment Method
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        id="modalButton"
                        data-toggle="modal"
                        data-target="#assignEarlyDeliveryGuy"
                        style={{ visibility: "hidden" }}
                    >
                        Launch static backdrop modal
                    </button>
                    <div
                        className="modal fade"
                        id="assignEarlyDeliveryGuy"
                        data-backdrop="static"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                    >
                        <div
                            className="modal-dialog modal-sm modal-dialog-centered"
                            role="document"
                            style={{ maxWidth: "370px" }}
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="staticBackdropLabel"
                                    >
                                        Warning
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="h6">
                                        <span className="text-secondary">
                                            Are you going to pick this order at
                                            restaurant by yourself?
                                        </span>
                                        <br />
                                        <span className="h6 text-warning">
                                            (As you are one of our delivery
                                            guy.)
                                        </span>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={() =>
                                            onPickupByDeliveryGuy(false)
                                        }
                                    >
                                        Nah
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-dismiss="modal"
                                        onClick={() =>
                                            onPickupByDeliveryGuy(true)
                                        }
                                    >
                                        Sure
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    if ((cart && cart.length === 0) || address === null) {
        if (address === null) return <Redirect to="/delivery_info" />;
        else return <Redirect to="/cart" />;
    }
    return (
        <div>
            <div className="text-center" style={{ marginTop: "7rem" }}>
                <div
                    className="spinner-border"
                    style={{ width: "3rem", height: "3rem" }}
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default YourOrder;
