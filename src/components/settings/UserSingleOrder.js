import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CircleCheck from "../svg's/CircleCheck";
import CircleSlesh from "../svg's/CircleSlesh";

const UserSingleOrder = ({ order, onSetOrderFavorite, history }) => {
    const dispatch = useDispatch();
    const { currentCart, orderToRepeat } = useSelector((state) => ({
        currentCart: state.cart.pizzaInCart,
        orderToRepeat: state.helper.orderToRepeat,
    }));
    const {
        isCancelledByRestaurant,
        isCancelledByUser,
        status,
        cart,
        paymentTimeDetailed,
        totalQuantity,
        isOrderFavorite,
        uniqueID,
    } = order;
    let { date, monthInWords, year } = paymentTimeDetailed;

    const onRepeatOrder = () => {
        console.log(orderToRepeat);
        dispatch({ type: "SET_CART", payload: orderToRepeat });
        document.getElementById("closeModal").click();
        return history.push("/cart");
    };
    return (
        <div className="card my-1">
            <div className="card-body">
                <div className="d-flex justify-content-between align-content-middle">
                    {(isCancelledByRestaurant || isCancelledByUser) && (
                        <span className="h6 text-danger">
                            <span className="align-middle">Cancelled</span>
                            <span className="ml-1 align-middle">
                                <CircleSlesh />
                            </span>
                        </span>
                    )}
                    {status.isDelivered && (
                        <span className="h6 text-success">
                            <span className="align-middle">Delivered</span>
                            <span className="ml-1 align-middle">
                                <CircleCheck />
                            </span>
                        </span>
                    )}
                    {!isCancelledByRestaurant &&
                        !isCancelledByUser &&
                        !status.isDelivered && (
                            <span className="h6 text-warning">
                                <span className="align-middle">On going</span>
                            </span>
                        )}
                    <a
                        href="#!"
                        className="text-decoration-none"
                        onClick={() =>
                            onSetOrderFavorite(isOrderFavorite, uniqueID)
                        }
                    >
                        {(isOrderFavorite === undefined ||
                            isOrderFavorite === false) && (
                            <span>Set as favorite</span>
                        )}
                        {isOrderFavorite === true && (
                            <svg
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 16 16"
                                className="mx-2 bi bi-bookmark-heart"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
                                />
                            </svg>
                        )}
                    </a>
                </div>
                {cart && cart.length > 0 && (
                    <div>
                        <span className="h6 text-secondary">
                            Total {totalQuantity}{" "}
                            {totalQuantity === 1 ? "item" : "items"}:{" "}
                        </span>
                        {cart.map((item, i) => (
                            <span
                                style={{ fontSize: "15px" }}
                                className="text-lowercase text-muted"
                                key={item.uniqueId}
                            >
                                {item.name}
                                {item.times > 1 && (
                                    <span>&times;{item.times}</span>
                                )}
                                <span>
                                    {i + 1 !== cart.length ? ", " : "."}
                                </span>
                            </span>
                        ))}
                    </div>
                )}
                <div>
                    <span className="h6 text-secondary">Total amount: </span>
                    <span className="text-muted" style={{ fontSize: "15px" }}>
                        ₹ {order.totalBill}
                    </span>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-7">
                        <span
                            className="text-muted h6"
                            style={{ fontSize: "15px" }}
                        >
                            Order placed on {`${date} ${monthInWords}, ${year}`}
                        </span>
                    </div>
                    <div className="col-sm-5 mt-3 mt-md-0 mt-lg-0">
                        <span className="float-right mr-2">
                            <button
                                className="btn btn-outline-dark btn-sm"
                                id="repeatOrder"
                                data-toggle="modal"
                                data-target="#repeatOrderModal"
                                onClick={() => {
                                    dispatch({
                                        type: "SET_ORDER_TO_REPEAT",
                                        payload: cart,
                                    });
                                }}
                            >
                                Repeat order
                            </button>
                        </span>
                    </div>
                </div>
                <div className="mt-1">
                    <div
                        className="float-right text-info"
                        style={{ fontSize: "13px" }}
                    >
                        You'll see cart in next step.
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="repeatOrderModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    style={{ maxWidth: "370px" }}
                >
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{ borderBottom: "none" }}
                        >
                            <h5 className="modal-title" id="exampleModalLabel">
                                {currentCart.length > 0 ? (
                                    <span>Warning</span>
                                ) : (
                                    <span>Repeat this order?</span>
                                )}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {currentCart.length > 0 && (
                            <div className="modal-body pt-0">
                                <span className="h6">
                                    Current item's in cart will replaced.
                                </span>
                            </div>
                        )}
                        <div className="mr-4 my-3">
                            <button
                                type="button"
                                className="btn btn-secondary float-right btn-sm"
                                data-dismiss="modal"
                                id="closeModal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary float-right btn-sm mr-2"
                                onClick={onRepeatOrder}
                            >
                                Sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSingleOrder;
