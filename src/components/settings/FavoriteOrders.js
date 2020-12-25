import React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import UserSingleOrder from "./UserSingleOrder";
import "./settingsStyles.css";

const FavoriteOrders = ({ auth, userUid, history }) => {
    useFirestoreConnect([
        {
            collection: "user_orders",
            doc: auth.isLoaded && userUid,
            subcollections: [
                {
                    collection: "all_orders",
                    orderBy: ["paymentTime", "desc"],
                    where: ["isOrderFavorite", "==", true],
                },
            ],
            storeAs: "favorite_orders",
        },
    ]);
    const firestore = useFirestore();
    const { allOrders, requesting } = useSelector((state) => ({
        allOrders: state.firestore.ordered.favorite_orders,
        requesting: state.firestore.status.requesting.favorite_orders,
    }));
    const onSetOrderFavorite = async (isOrderFavorite, orderId) => {
        console.log(isOrderFavorite);
        if (isOrderFavorite === undefined || isOrderFavorite === false) {
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({ isOrderFavorite: true });
            //show toast
            let x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = "Set as favorite";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 1700);
        } else if (isOrderFavorite === true) {
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({ isOrderFavorite: false });
            //show toast
            let x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = "Removed from favorite";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 1700);
        }
    };
    return (
        <div className="card borderForOrders">
            <div className="h4 text-center text-secondary mt-2">
                Favorite orders
            </div>
            <div className="card-body px-0 px-md-3">
                {requesting && !allOrders && (
                    <div className="text-center my-4">
                        <div className="spinner-border spinner-border-success">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                {allOrders &&
                    allOrders.length > 0 &&
                    allOrders.map((order) => {
                        const { uniqueID } = order;
                        return (
                            <UserSingleOrder
                                order={order}
                                onSetOrderFavorite={onSetOrderFavorite}
                                history={history}
                                key={uniqueID}
                            />
                        );
                    })}
                {allOrders && allOrders.length === 0 && (
                    <div className="text-center my-4 text-muted font-italic">
                        You didn't marked any favorite order.
                    </div>
                )}
            </div>
            <div id="snackbar"></div>
        </div>
    );
};

export default FavoriteOrders;
