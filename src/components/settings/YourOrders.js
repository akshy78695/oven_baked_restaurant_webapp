import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import UserSingleOrder from "./UserSingleOrder";
import "./settingsStyles.css";

const YourOrders = ({ auth, userUid, history }) => {
    useFirestoreConnect([
        {
            collection: "user_orders",
            doc: auth.isLoaded && userUid,
            subcollections: [
                { collection: "all_orders", orderBy: ["paymentTime", "desc"] },
            ],
            storeAs: "all_orders",
        },
    ]);
    const firestore = useFirestore();
    const { allOrders } = useSelector((state) => ({
        allOrders:
            state.firestore.ordered.all_orders &&
            state.firestore.ordered.all_orders,
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
    useEffect(() => {
        if (auth.isLoaded) {
        }
    }, [auth.isLoaded]);
    return (
        <div className="card borderForOrders">
            <div className="h4 text-center text-secondary mt-2">
                Order history
            </div>
            {/* <div className="card-body px-xs-0 px-sm-0 px-md-3 px-lg-3"> */}
            <div className="card-body px-0 px-md-3">
                {allOrders === undefined ? (
                    <div className="text-center my-4">
                        <div className="spinner-border spinner-border-success">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : allOrders && allOrders.length > 0 ? (
                    allOrders.map((order) => {
                        const { uniqueID } = order;
                        return (
                            <UserSingleOrder
                                order={order}
                                onSetOrderFavorite={onSetOrderFavorite}
                                key={uniqueID}
                                history={history}
                            />
                        );
                    })
                ) : (
                    <div className="text-center my-4 text-muted font-italic">
                        You don't have any order history.
                    </div>
                )}
            </div>
            <div id="snackbar"></div>
        </div>
    );
};

export default YourOrders;
