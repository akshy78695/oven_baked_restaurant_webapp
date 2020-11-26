import React, { useState } from "react";
import { Link } from "react-router-dom";
import passwordStrength from "check-password-strength";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import Alert from "../layout/Alert";

const SignUpForm = ({ history }) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [passwordKaStrength, setPasswordKaStrength] = useState("");

    const firebase = useFirebase();
    const dispatch = useDispatch();

    const alert = useSelector((state) => state.alert);

    const { email, password } = credential;
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
        if (alert.message) dispatch({ type: "HIDE_ALERT" });
        if (e.target.name === "password") {
            if (e.target.value === "") setPasswordKaStrength("");
            else if (e.target.value.length > 14)
                setPasswordKaStrength("Strong");
            else setPasswordKaStrength(passwordStrength(e.target.value).value);
        }
        // if (alert.message) {
        //     dispatch({ type: "HIDE_ALERT" });
        // }
    };
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            // await firebase.login({ email, password });
            if (email.trim() === "" || password.trim() === "") {
                dispatch({
                    type: "SET_ALERT",
                    payload: { message: "email and password are required" },
                });
                setLoading(false);
            } else if (password.trim().length < 6) {
                dispatch({
                    type: "SET_ALERT",
                    payload: { message: "Enter atleast 6 letter password" },
                });
                setLoading(false);
            } else {
                await firebase.createUser(
                    { ...credential },
                    { isCheckOut: false, email }
                );
                setLoading(false);
                history.push("/");
            }
        } catch (error) {
            console.log(error);
            if ((error.code = "auth/email-already-in-use")) {
                dispatch({
                    type: "SET_ALERT",
                    payload: { message: "Email is already in use" },
                });
            }
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="text-center h2 text-warning mt-4 ">Sign up</div>
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
                            placeholder="for e.g abc@gmail.com"
                            id=""
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="form-group h6">
                    <label>Create new password: </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={onChange}
                    />
                    {passwordKaStrength && (
                        <label
                            className="font-weight-normal ml-2"
                            style={{ fontSize: "14px" }}
                        >
                            <span
                                className={`${
                                    passwordKaStrength === "Weak"
                                        ? "text-danger"
                                        : passwordKaStrength === "Medium"
                                        ? "text-info"
                                        : passwordKaStrength === "Strong"
                                        ? "text-success"
                                        : ""
                                } mt-1`}
                            >
                                {passwordKaStrength}
                            </span>
                        </label>
                    )}
                </div>
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
                            id="sign-up-submit-button"
                            className="btn btn-outline-warning float-right"
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
                                <span>Sign Up</span>
                            )}
                        </button>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-md-12">
                        <Link to="/signin" className="text-decoration-none">
                            <div
                                className="text-center text-warning h6"
                                style={{ cursor: "pointer" }}
                            >
                                Already have an account
                            </div>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
