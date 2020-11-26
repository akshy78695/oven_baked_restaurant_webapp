import React from "react";
import "./orderStyle.css";

const NotConfirmed = ({ cancelOrder }) => {
    return (
        <div className="card">
            <div className="card-body px-1">
                <div className="text-center text-success h4">
                    Restaurant has received your order{" "}
                    <span>
                        <img
                            src="https://img.icons8.com/doodle/48/000000/checkmark.png"
                            alt=""
                        />
                    </span>
                </div>
                <div className="text-center text-warning h4 align-items-center">
                    Waiting for confirmation{" "}
                    <span className="h3 font-weight-bold">!</span>
                </div>
                <div
                    className="text-center text-secondary"
                    style={{ fontSize: "14px" }}
                >
                    (Should take less then couple of minutes)
                </div>
                <div className="mx-sm-3 mx-md-5 text-center my-3">
                    <img
                        src="/images/pizzaSlices.webp"
                        alt=""
                        className="img-fluid pizza-slice"
                        style={{
                            borderRadius: "50%",
                            width: "250px",
                            height: "250px",
                            minHeight: "100px",
                            minWidth: "100px",
                            maxHeight: "300px",
                            maxWidth: "300px",
                        }}
                    />
                </div>
                <div className="mx-sm-3 mx-md-5">
                    <button
                        className="btn btn-outline-danger btn-block"
                        onClick={cancelOrder}
                    >
                        Cancel my order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotConfirmed;
