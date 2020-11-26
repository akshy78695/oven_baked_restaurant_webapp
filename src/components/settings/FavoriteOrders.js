import React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import UserSingleOrder from "./UserSingleOrder";

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
    const { allOrders } = useSelector((state) => ({
        allOrders:
            state.firestore.ordered.all_orders &&
            state.firestore.ordered.all_orders,
    }));
    console.log(allOrders);
    const onSetOrderFavorite = async (isOrderFavorite, orderId) => {
        console.log(isOrderFavorite);
        if (isOrderFavorite === undefined || isOrderFavorite === false)
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({ isOrderFavorite: true });
        else if (isOrderFavorite === true)
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({ isOrderFavorite: false });
    };
    return (
        <div className="card ">
            <div className="h4 text-center text-secondary mt-2">
                Order history
            </div>
            <div className="card-body">
                {allOrders === undefined ? (
                    <div className="text-center my-4">
                        <div className="spinner-border spinner-border-success">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : allOrders && allOrders.length > 0 ? (
                    allOrders.map((order) => {
                        const { uniqueID } = order;
                        if (order.isOrderFavorite)
                            return (
                                <UserSingleOrder
                                    order={order}
                                    onSetOrderFavorite={onSetOrderFavorite}
                                    history={history}
                                    key={uniqueID}
                                />
                            );
                        else return null;
                    })
                ) : (
                    <div className="text-center my-4 text-muted font-italic">
                        You don't have any order history.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteOrders;
