import React from "react";
import { useDispatch } from "react-redux";

const Cancelled = ({ history, isCancelledByUser, isCancelledByRestaurant }) => {
    const dispatch = useDispatch();
    return (
        <div className="card">
            <div className="card-body border border-info">
                <div className="row">
                    <div className="col-md-12">
                        <button className="float-right btn btn-link text-decoration-none btn-sm">
                            Help
                        </button>
                    </div>
                </div>
                <div className="text-center mb-4 mt-2">
                    <img
                        src="https://img.icons8.com/officel/65/000000/cancel-subscription.png"
                        alt=""
                    />
                </div>
                <div className="text-center h5  my-2 text-muted">
                    Your order was cancelled.
                </div>
                {isCancelledByRestaurant && (
                    <div className="my-3 h6 text-muted text-center">
                        We had to cancel your order. Don't worry,
                        <br /> if you paid for your order then it'll be
                        <br /> refunded. See you next time
                    </div>
                )}
                {isCancelledByUser && (
                    <div className="my-3 h6 text-muted text-center">
                        You just cancelled your order. Don't worry,
                        <br /> if you paid for your order then it'll be
                        <br /> refunded. See you next time
                    </div>
                )}
                <div className="text-center my-4">
                    <button
                        className="btn btn-outline-info"
                        onClick={() => {
                            dispatch({
                                type: "SET_MOVE_TO_MENU",
                                payload: true,
                            });
                            history.push("/");
                        }}
                    >
                        <span className="mx-3">Start over</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cancelled;
