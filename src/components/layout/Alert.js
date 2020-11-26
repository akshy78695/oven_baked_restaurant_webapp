import React from "react";

const Alert = ({ type, message, className }) => {
    return (
        <div>
            <div
                className={`h6 alert alert-${type || "warning"} ${
                    className || ""
                }`}
            >
                {message}
            </div>
        </div>
    );
};

export default Alert;
