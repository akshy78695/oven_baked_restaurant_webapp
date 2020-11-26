import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useEffect } from "react";
import { useState } from "react";
import cuid from "cuid";
import { useDispatch, useSelector } from "react-redux";
import ClipboardSvg from "../svg's/ClipboardSvg";

const differenceBetweenDateInMinutes = (currentDate, Date) => {
    return (currentDate - Date) / 60000;
};
let copyToClipboard = "";
const AccountSettings = ({ history, auth }) => {
    const [loginTimeDifference, setLoginTimeDifference] = useState(null);
    const [copySuccess, setCopySuccess] = useState("");
    const firebase = useFirebase();

    const dispatch = useDispatch();

    const alert = useSelector((state) => state.alert && state.alert);
    const onLogout = async () => {
        await firebase.logout();
        if (alert && alert.message) dispatch({ type: "HIDE_ALERT" });
        history.push("/");
    };
    const onChangePassword = () => {
        if (loginTimeDifference < 5) {
            let token = cuid();
            dispatch({ type: "SET_CHANGE_PASSWORD_TOKEN", payload: token });
            history.push(`/account/change_password/token/${token}`);
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
    const onCopyID = async (e, id) => {
        try {
            await navigator.clipboard.writeText(id);
            setCopySuccess("Copied!");
        } catch (err) {
            setCopySuccess("Failed to copy!");
        }
    };
    useEffect(() => {
        if (auth.lastLoginAt) {
            let temp = differenceBetweenDateInMinutes(
                Date.now(),
                auth.lastLoginAt
            );
            setLoginTimeDifference(parseInt(temp));
        }
        if (copySuccess) {
            copyToClipboard = setTimeout(() => {
                setCopySuccess("");
            }, 1500);
        }
        return () => {
            if (copySuccess) clearTimeout(copyToClipboard);
            if (alert && alert.message) dispatch({ type: "HIDE_ALERT" });
        };
        //eslint-disable-next-line
    }, [auth.isLoaded, alert, copySuccess]);
    return (
        <div>
            <div className="card">
                <div className="card-title px-3 h3 text-center py-2">
                    Account settings
                </div>
                <div className="card-body">
                    <div className="mb-2 ml-2">
                        Your ID:{" "}
                        <span
                            className="text-muted"
                            style={{ fontSize: "15px" }}
                        >
                            {auth ? auth.uid : ""}{" "}
                            <span
                                className="float-right mr-1 mb-1"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => onCopyID(e, auth.uid)}
                            >
                                <ClipboardSvg />
                                {/* <button className="btn btn-outline-dark py-1 btn-sm">
                                    copy
                                </button> */}
                            </span>
                        </span>
                    </div>
                    <div className="text-center my-2">
                        <div className="h6 text-muted">{copySuccess}</div>
                    </div>
                    {loginTimeDifference !== null ? (
                        <div className="list-group">
                            <div
                                className="list-group-item list-group-item-action"
                                onClick={onChangePassword}
                            >
                                Change password
                            </div>
                            {alert && alert.message && (
                                <div
                                    className={`text-${
                                        alert.type || "danger"
                                    } font-italic ml-2 font-weight-bold text-center my-2`}
                                    style={{ fontSize: "13px" }}
                                >
                                    {alert.message}
                                </div>
                            )}
                            <div
                                className="list-group-item list-group-item-action text-danger"
                                onClick={onLogout}
                            >
                                Logout
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="spinner-border my-4">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
