import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useEffect } from "react";

const ChangePassword = ({ match, history }) => {
    let isMounted = useRef(true);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);
    const [passwordShortAlert, setPasswordShortAlert] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const firebase = useFirebase();
    const dispatch = useDispatch();
    const token = useSelector(
        (state) => state.helper && state.helper.changePasswordToken
    );
    const onChange = (e) => {
        if (e.target.name === "password") {
            setPassword(e.target.value);
            if (e.target.value.length < 6) {
                setPasswordShortAlert(true);
                setPasswordMatchAlert(false);
            } else {
                setPasswordShortAlert(false);
                if (password2.length < 6) setPasswordMatchAlert(true);
            }
        }
        if (e.target.name === "password2") {
            setPassword2(e.target.value);
            if (e.target.value === password) setPasswordMatchAlert(false);
            else setPasswordMatchAlert(true);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsSubmit(true);
    };
    useEffect(() => {
        isMounted.current = true;
        const updateUsersPassword = async () => {
            const auth = firebase.auth().currentUser;
            await auth
                .updatePassword(password)
                .then(() => {
                    if (isMounted.current) {
                        dispatch({
                            type: "SET_ALERT",
                            payload: {
                                type: "success",
                                message: "Your password has been updated! :)",
                            },
                        });
                        setLoading(false);
                        history.push("/settings/account");
                    }
                })
                .catch((e) => console.log(e.message));
            // await firebase.logout().then(() => {});
        };
        if (isSubmit) {
            updateUsersPassword();
        }
        return () => (isMounted.current = false);
    });
    if (token === match.params.id)
        return (
            <div className="container" style={{ marginTop: "60px" }}>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <div className="h5 my-3 text-center">
                                    Change password
                                </div>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label className="">
                                            Enter new password:
                                        </label>
                                        <input
                                            type="text"
                                            name="password"
                                            className="form-control"
                                            value={password}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="">
                                            Re-enter new password:
                                        </label>
                                        <input
                                            type="text"
                                            name="password2"
                                            className="form-control"
                                            value={password2}
                                            onChange={onChange}
                                        />
                                    </div>
                                    {passwordShortAlert && (
                                        <div className="h6 text-center text-danger">
                                            Password is too short.
                                        </div>
                                    )}
                                    {passwordMatchAlert && (
                                        <div className="h6 text-center text-danger">
                                            Password should match.
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn-outline-info btn-block"
                                        disabled={
                                            password.length >= 6 &&
                                            password2.length >= 6 &&
                                            password === password2
                                                ? false
                                                : true
                                        }
                                    >
                                        {loading ? (
                                            <div
                                                className="spinner-border"
                                                style={{
                                                    width: "1.3rem",
                                                    height: "1.3rem",
                                                }}
                                            >
                                                <span className="sr-only">
                                                    Loading..
                                                </span>
                                            </div>
                                        ) : (
                                            <span>Update</span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    return (
        <div className="container" style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="h3">403 unauthorized</div>
                            <div className="h6 font-weight-normal">
                                Token is Broken or Expired. :(
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
