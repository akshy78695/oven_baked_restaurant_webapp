import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../layout/Alert";

const SignInForm = ({ history, authIsEmpty }) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [adminCode, setAdminCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const firebase = useFirebase();
    const dispatch = useDispatch();

    const alert = useSelector((state) => state.alert);
    const redirectToCart = useSelector(
        (state) => state.helper && state.helper.redirectToCart
    );
    const onChange = (e) => {
        if (e.target.name !== "adminCode") {
            if (e.target.name === "email")
                setCredential({
                    ...credential,
                    email: e.target.value.toLowerCase(),
                });
            else
                setCredential({
                    ...credential,
                    [e.target.name]: e.target.value,
                });
        } else setAdminCode(e.target.value);
        if (e.target.name === "email") {
            let string = e.target.value;
            if (string.toLowerCase() === "admin@gmail.com") setIsAdmin(true);
            else setIsAdmin(false);
        }
        if (alert.message) {
            dispatch({ type: "HIDE_ALERT" });
        }
    };
    const onSubmit = async (e) => {
        if (alert.message) {
            dispatch({ type: "HIDE_ALERT" });
        }
        setLoading(true);
        e.preventDefault();
        try {
            if (email === "admin@gmail.com")
                if (adminCode !== "admin404") {
                    setLoading(false);
                    return dispatch({
                        type: "SET_ALERT",
                        payload: { message: "Wrong admin code" },
                    });
                }
            await firebase.login({ email, password });
            if (email === "admin@gmail.com")
                dispatch({ type: "SET_ADMIN", payload: true });
            else dispatch({ type: "SET_ADMIN", payload: false });
            setLoading(false);
            if (redirectToCart && email !== "admin@gmail.com") {
                dispatch({ type: "SET_REDIRECT_TO_CART", payload: false });
                history.push("/delivery_info");
            } else {
                history.push("/");
            }
        } catch (error) {
            console.log(error);
            if (
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                dispatch({
                    type: "SET_ALERT",
                    payload: { message: "Invalid Credentials" },
                });
            } else if (error.code === "auth/network-request-failed") {
                dispatch({
                    type: "SET_ALERT",
                    payload: { message: "Make sure internet working." },
                });
            }
            setLoading(false);
        }
    };
    const { email, password } = credential;
    if (!authIsEmpty) {
        return (
            <div>
                <div className="text-center my-5">
                    <div className="h5 text-secondary">
                        You are already logged in
                    </div>
                    <div>
                        <button
                            className="btn btn-warning btn-lg my-3"
                            onClick={() => history.goBack()}
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="mt-4">
            <div className="text-center h2">
                {isAdmin ? <span>Admin</span> : <span>Sign In</span>}
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group h6">
                    <label>Email: </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">@</span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            // placeholder="for e.g abc@gmail.com"
                            id="email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="form-group h6">
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                {isAdmin && (
                    <div className="form-group h6">
                        <label htmlFor="adminCode">Secret admin code:</label>
                        <input
                            type="text"
                            name="adminCode"
                            className="form-control"
                            value={adminCode}
                            onChange={onChange}
                            placeholder="which is not 'admin404'"
                        />
                    </div>
                )}
                <div className="row">
                    <div className="col-md-12">
                        {alert.message && (
                            <Alert type={alert.type} message={alert.message} />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button
                            type="submit"
                            id="sign-in-submit-button"
                            className="btn btn-outline-dark float-right"
                            disabled={
                                email.trim() === ""
                                    ? true
                                    : password.trim() === ""
                                    ? true
                                    : false
                            }
                        >
                            {loading ? (
                                <div
                                    className="spinner-border mx-2"
                                    style={{
                                        width: "1.3rem",
                                        height: "1.3rem",
                                    }}
                                >
                                    <span className="sr-only">Loading..</span>
                                </div>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-md-12">
                        <Link to="/signup" className="text-decoration-none">
                            <div
                                className="text-center text-dark h6"
                                style={{ cursor: "pointer" }}
                            >
                                Create an account
                            </div>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
