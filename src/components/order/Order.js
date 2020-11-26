import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import Cancelled from "./Cancelled";
import Cooking from "./Cooking";
import Delivered from "./Delivered";
import NotConfirmed from "./NotConfirmed";
import OnWay from "./OnWay";

const Order = ({ history }) => {
    const dispatch = useDispatch();
    const firestore = useFirestore();
    const { auth } = useSelector(
        (state) => state.firebase.auth && state.firebase
    );
    const order = useSelector(
        (state) => state.firestore && state.firestore.ordered.userOrder
    );
    const orderLoading = useSelector(
        (state) =>
            state.firestore.status &&
            state.firestore.status.requesting.userOrder
    );
    console.log(order);
    const cancelOrder = async () => {
        if (auth && auth.isLoaded) {
            await firestore
                .collection("orders")
                .doc(auth.uid)
                .update({ isCancelledByUser: true });
            await firestore
                .collection("user_orders")
                .doc(auth.uid)
                .collection("all_orders")
                .doc(order[0].id)
                .update({ isCancelledByUser: true });
        }
    };
    if (
        !orderLoading && order !== undefined && order.length === 0
            ? true
            : false
    ) {
        return (
            <div style={{ marginTop: "40vh" }} className="text-center">
                <div className="h3">No order found.</div>
                <button
                    className="btn btn-outline-primary my-4"
                    onClick={() => {
                        dispatch({ type: "SET_MOVE_TO_MENU", payload: true });
                        history.push("/");
                    }}
                >
                    Order something
                </button>
            </div>
        );
    }
    if (!orderLoading && order !== undefined && order.length > 0) {
        let {
            status,
            isCancelledByRestaurant,
            isCancelledByUser,
            deliveryPerson,
        } = order[0];
        return (
            <div className="container" style={{ marginTop: "55px" }}>
                <div className="row" style={{ margin: "0 0.4px" }}>
                    <div className="col-md-7 mb-5 mx-auto">
                        {(isCancelledByRestaurant || isCancelledByUser) && (
                            <Cancelled
                                history={history}
                                isCancelledByUser={isCancelledByUser}
                                isCancelledByRestaurant={
                                    isCancelledByRestaurant
                                }
                            />
                        )}
                        {status &&
                            !isCancelledByUser &&
                            !isCancelledByRestaurant &&
                            !status.isConfirm && (
                                <NotConfirmed cancelOrder={cancelOrder} />
                            )}
                        {status &&
                            !isCancelledByUser &&
                            !isCancelledByRestaurant &&
                            status.isConfirm &&
                            !status.onWay &&
                            !status.isDelivered && (
                                <Cooking cancelOrder={cancelOrder} />
                            )}
                        {status &&
                            !isCancelledByUser &&
                            !isCancelledByRestaurant &&
                            status.onWay &&
                            !status.isDelivered && (
                                <OnWay deliveryPerson={deliveryPerson} />
                            )}
                        {status &&
                            !isCancelledByUser &&
                            !isCancelledByRestaurant &&
                            status.isDelivered && (
                                <Delivered history={history} />
                            )}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="text-center" style={{ marginTop: "40vh" }}>
            <div className="spinner-grow">
                <span className="sr-only">Loading</span>
            </div>
            <div className="mt-3 text-secondary">Getting your order</div>
        </div>
    );
};

export default Order;
