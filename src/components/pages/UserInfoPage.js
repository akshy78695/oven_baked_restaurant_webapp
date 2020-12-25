import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeSvg from "../svg's/HomeSvg";
import BriefcaseSvg from "../svg's/BriefcaseSvg";
import BuildingSvg from "../svg's/BuildingSvg";
import { Redirect, Link } from "react-router-dom";

const UserInfoPage = ({ history }) => {
    const [userAddresses, setUserAddresses] = useState([]);

    const dispatch = useDispatch();
    let user_profile = useSelector(
        (state) => state.firebase && state.firebase.profile
    );
    let redirectToAddress = useSelector(
        (state) => state.helper && state.helper.redirectToAddress
    );
    let cart = useSelector((state) => state.cart && state.cart.pizzaInCart);
    const onAddressClick = (address) => {
        dispatch({ type: "SET_ADDRESS", payload: address });
        history.push("/order_confirmation");
    };
    useEffect(() => {
        if (user_profile.isLoaded && user_profile.addresses) {
            setUserAddresses(user_profile.addresses);
        }
        if (redirectToAddress) {
            dispatch({ type: "SET_REDIRECT_TO_ADDRESS", payload: false });
        }
        //eslint-disable-next-line
    }, [user_profile, redirectToAddress]);

    if (cart && cart.length > 0) {
        return (
            <div style={{ marginTop: "60px" }}>
                <div className="row mx-0">
                    <div className="col-md-6 mx-auto">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block  p-0">
                                <img
                                    src="/images/delivary_info.jpg"
                                    alt=""
                                    className="img-fluid border border-right-0"
                                />
                            </div>
                            <div
                                className="col-lg-7 ml-lg-0 mx-auto mx-md-auto border bg-white"
                                style={{ maxWidth: "350px" }}
                            >
                                <div className="h4 text-center text-secondary my-3">
                                    Delivary Information
                                </div>
                                <div
                                    className="card mt-2"
                                    style={{ border: "solid purple 1px" }}
                                >
                                    <div className="card-body">
                                        <div className="h6">
                                            Choose your address:
                                        </div>

                                        {user_profile.isLoaded ? (
                                            userAddresses &&
                                            userAddresses.length > 0 ? (
                                                userAddresses.map((address) => (
                                                    <div
                                                        key={address.id}
                                                        className="list-group mb-2"
                                                        onClick={() =>
                                                            onAddressClick(
                                                                address
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                cursor:
                                                                    "pointer",
                                                            }}
                                                            className="list-group-item list-group-item-action border"
                                                        >
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h6 className="mb-1">
                                                                    {
                                                                        address.name
                                                                    }
                                                                </h6>
                                                                <small>
                                                                    {address.name.toLowerCase() ===
                                                                    "home" ? (
                                                                        <HomeSvg />
                                                                    ) : address.name.toLowerCase() ===
                                                                      "work" ? (
                                                                        <BriefcaseSvg />
                                                                    ) : (
                                                                        <BuildingSvg />
                                                                    )}
                                                                </small>
                                                            </div>
                                                            <p
                                                                className="mb-1"
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                }}
                                                            >
                                                                {address.street}
                                                                ,{address.city},
                                                                {address.state}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-muted text-center mt-3">
                                                    No address saved.
                                                </div>
                                            )
                                        ) : (
                                            <div className="text-center mt-5 mb-4">
                                                <div className="spinner-border">
                                                    <span className="sr-only">
                                                        Loading..
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-center mb-5 mb-md-3">
                                    <Link
                                        to="/settings/address"
                                        className="btn btn-link float-right text-decoration-none mt-3"
                                        onClick={() =>
                                            dispatch({
                                                type: "SET_REDIRECT_TO_ADDRESS",
                                                payload: true,
                                            })
                                        }
                                    >
                                        Manage addresses
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span
                    className="d-none d-lg-block"
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        right: "10px",
                        fontSize: "12px",
                    }}
                >
                    <a href="https://www.freepik.com/vectors/travel">
                        Travel vector created by stories
                    </a>
                </span>
            </div>
        );
    }
    if (cart && cart.length === 0) {
        return <Redirect to="/cart" />;
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

export default UserInfoPage;
