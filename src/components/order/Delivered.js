import React from "react";
import { useDispatch } from "react-redux";

const Delivered = ({ history }) => {
    const dispatch = useDispatch();
    return (
        <div className="card border-0">
            <div className="card-body px-0 ">
                <div className="h5 text-center">Your order was delivered.</div>
                <div className="h6 text-center">Enjoy your food. </div>
                <div className="my-3 text-center">
                    <img
                        src="/images/eating_pizza.jpg"
                        className="img-responsive"
                        width="100%"
                        height="100%"
                        alt=""
                        style={{ maxWidth: "410px", maxHeight: "410px" }}
                    />
                </div>
                <div className="text-info text-center mt-4">
                    <div
                        onClick={() => {
                            dispatch({
                                type: "SET_MOVE_TO_MENU",
                                payload: true,
                            });
                            history.push("/");
                        }}
                        className="btn btn-outline-dark"
                    >
                        <span className="mx-2">Check menu</span>
                    </div>
                </div>
                <div className="text-primary float-right mt-3">Need help?</div>
            </div>
        </div>
    );
};

export default Delivered;
