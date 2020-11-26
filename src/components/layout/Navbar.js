import React, { Fragment, useEffect, useState } from "react";
import "./layoutStyle.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
};
const Navbar = () => {
    const [width, setWidth] = useState(getWindowWidth);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.firebase && state.firebase.auth);
    const cart = useSelector((state) => state.cart && state.cart.pizzaInCart);
    useFirestoreConnect([
        {
            collection: "orders",
            // doc: auth.uid,
            where: [["userUid", "==", `${auth && auth.uid}`]],
            storeAs: "userOrder",
        },
    ]);
    const { isAdmin } = useSelector((state) => state.helper && state.helper);
    useEffect(() => {
        setWidth(getWindowWidth);
        if (auth.isLoaded)
            if (auth.uid === "CE2Kc71TyVer4UDm2AahKqn7DXk1")
                dispatch({ type: "SET_ADMIN", payload: true });
            else dispatch({ type: "SET_ADMIN", payload: false });
        //eslint-disable-next-line
    }, [auth.isLoaded]);
    return (
        <Fragment>
            <nav className="navbar navbar-expand fixed-top" id="navbar">
                <Link
                    to="/"
                    id="navbar-brand"
                    className="navbar-brand text-white font-weight-bold"
                >
                    Oven-Baked
                </Link>
                {auth.isLoaded && (
                    <button
                        className="navbar-toggler custom-toggler "
                        style={{ outline: "none" }}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon "></span>
                    </button>
                )}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {auth.isLoaded && auth.isEmpty && (
                            <Fragment>
                                <Link to="/cart" className="text-white">
                                    <li
                                        style={{ cursor: "pointer" }}
                                        className="nav-item"
                                    >
                                        <span className="nav-link cart mr-2">
                                            Cart
                                            {cart && cart.length > 0 && (
                                                <span className="cart-badge">
                                                    {cart.length < 10
                                                        ? cart.length
                                                        : "9+"}
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                </Link>
                                <Link
                                    to="/signin"
                                    style={{ textDecoration: "none" }}
                                >
                                    <li
                                        style={{ cursor: "pointer" }}
                                        className="nav-item "
                                    >
                                        <span className="nav-link text-white">
                                            Sign in
                                        </span>
                                    </li>
                                </Link>
                            </Fragment>
                        )}
                        {auth.isLoaded &&
                            !auth.isEmpty &&
                            isAdmin !== null &&
                            isAdmin !== true && (
                                <Fragment>
                                    <Link to="/cart">
                                        <li
                                            style={{ cursor: "pointer" }}
                                            className="nav-item"
                                        >
                                            <span className="nav-link cart mr-2 text-white">
                                                <span
                                                    className=""
                                                    style={{ color: "white" }}
                                                >
                                                    Cart
                                                </span>
                                                {cart && cart.length > 0 && (
                                                    <span className="cart-badge">
                                                        {cart.length < 10
                                                            ? cart.length
                                                            : "9+"}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    </Link>
                                    {width >= 800 ? (
                                        <Link
                                            to="/settings"
                                            style={{ cursor: "pointer" }}
                                            className="nav-item text-decoration-none"
                                        >
                                            <span className="nav-link text-white">
                                                Settings
                                            </span>
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/_settings"
                                            style={{ cursor: "pointer" }}
                                            className="nav-item text-decoration-none"
                                        >
                                            <span className="nav-link text-white">
                                                Settings
                                            </span>
                                        </Link>
                                    )}
                                </Fragment>
                            )}
                        {auth.isLoaded &&
                            !auth.isEmpty &&
                            isAdmin !== null &&
                            isAdmin === true && (
                                <Fragment>
                                    <Link
                                        to="/orders"
                                        className="nav-item text-decoration-none text-white"
                                    >
                                        <span className="nav-link">Orders</span>
                                    </Link>
                                    <Link
                                        to="/admin/settings"
                                        style={{ cursor: "pointer" }}
                                        className="nav-item text-decoration-none"
                                    >
                                        <span className="nav-link text-white">
                                            Settings
                                        </span>
                                    </Link>
                                </Fragment>
                            )}
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;
