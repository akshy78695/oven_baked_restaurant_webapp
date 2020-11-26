import cuid from "cuid";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";

const differenceBetweenDateInMinutes = (currentDate, Date) => {
    return (currentDate - Date) / 60000;
};

const AdminSettings = ({ history }) => {
    const [loginTimeDifference, setLoginTimeDifference] = useState(null);

    const { auth } = useSelector((state) => state.firebase && state.firebase);
    const alert = useSelector((state) => state.alert && state.alert);
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const onChangePassword = () => {
        if (loginTimeDifference < 5) {
            let token = cuid();
            dispatch({ type: "SET_CHANGE_PASSWORD_TOKEN", payload: token });
            return history.push(`/account/change_password/token/${token}`);
        } else {
            dispatch({
                type: "SET_ALERT",
                payload: {
                    type: "danger",
                    message:
                        "This action needs recent login.! (Please login again)",
                },
            });
        }
    };
    useEffect(() => {
        if (auth.isLoaded) {
            let temp = differenceBetweenDateInMinutes(
                Date.now(),
                auth.lastLoginAt
            );
            setLoginTimeDifference(parseInt(temp));
        }
        return () => {
            if (alert && alert.message) dispatch({ type: "HIDE_ALERT" });
        };
        //eslint-disable-next-line
    }, [auth.isLoaded, alert]);
    return (
        <div className="container" style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-7 col-lg-5 mx-auto">
                    <div className="card border pb-4">
                        <div className="card-body">
                            <div className="text-center align-items-self">
                                <img
                                    src="https://img.icons8.com/cotton/64/000000/user-settings.png"
                                    alt=""
                                />
                                <span className="h5">Admin settings</span>
                            </div>
                            <hr />
                            <div className="list-group">
                                <div className="list-group-item list-group-item-warning">
                                    Basic
                                </div>
                                <Link to="/orders_history"
                                    className="list-group-item list-group-item-warning list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                >
                                    Orders history
                                </Link>
                                <div
                                    className="list-group-item list-group-item-warning list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                    onClick={onChangePassword}
                                >
                                    Change Password
                                </div>
                                {alert && alert.message && (
                                    <div
                                        className={`text-center text-${
                                            alert.type || "dark"
                                        } my-2 font-weight-bold`}
                                        style={{ fontSize: "13px" }}
                                    >
                                        {alert.message}
                                    </div>
                                )}
                                <div
                                    className="list-group-item list-group-item-action list-group-item-warning"
                                    style={{ cursor: "pointer" }}
                                    onClick={async () => {
                                        await firebase.logout();
                                        history.push("/");
                                    }}
                                >
                                    Logout
                                </div>
                            </div>
                            <div
                                className="text-center mt-4 mb-2 font-weight-bold text-danger"
                                style={{ fontSize: "13px" }}
                            >
                                Danger zone
                            </div>
                            <div className="list-group">
                                <div
                                    className="list-group-item list-group-item-danger list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                >
                                    Edit Products
                                </div>
                                <Link
                                    to="/delivery_person"
                                    className="list-group-item list-group-item-danger list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                >
                                    Delivery person/s
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
