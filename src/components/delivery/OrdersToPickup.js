import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { differenceBetweenDateInMinutes } from "../helpers/timeDifference";
import { deleteObjectProperty } from "../helpers/helperFunctions";

const OrdersToPickup = () => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isNoOrders, setIsNoOrders] = useState(false);
    const firestore = useFirestore();
    console.log(loading);
    useFirestoreConnect([
        {
            collection: "orders",
            // where: ["status.isConfirm", "==", true],
            orderBy: ["paymentTime", "desc"],
            storeAs: "ordersToPickup",
        },
    ]);
    const { orders, requesting, uid, profile } = useSelector((state) => ({
        orders: state.firestore.ordered.ordersToPickup,
        requesting: state.firestore.status.requesting.ordersToPickup,
        uid: state.firebase.auth.uid,
        profile: state.firebase.profile,
    }));
    const onOrderAccept = async (userUid, orderId) => {
        let { phone, email, name, uniqueId } = profile;
        let obj = { name, email, phone, uid, uniqueId };
        setLoading(true);
        try {
            await firestore.collection("orders").doc(userUid).update({
                deliveryPerson: obj,
            });
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({
                    deliveryPerson: obj,
                })
                .then(() => setLoading(false));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    // const onOrderCancel = async (userUid, orderId) => {
    //     let temp = `ignoredBy${uid}`;
    //     let obj = { [temp]: true };
    //     try {
    //         await firestore.collection("orders").doc(userUid).update(obj);
    //         await firestore
    //             .collection("user_orders")
    //             .doc(userUid)
    //             .collection("all_orders")
    //             .doc(orderId)
    //             .update(obj)
    //             .then(() => setLoading(false));
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // };
    const onOrderPickedUp = async (userUid, orderId) => {
        try {
            await firestore
                .collection("orders")
                .doc(userUid)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: true,
                        onWay: true,
                        isDelivered: false,
                    },
                });
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: true,
                        onWay: true,
                        isDelivered: false,
                    },
                })
                .then(() => setLoading(false));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const onOrderDelivered = async (userUid, orderId, order) => {
        try {
            await firestore
                .collection("orders")
                .doc(userUid)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: true,
                        onWay: false,
                        isDelivered: true,
                    },
                    isDelivered: true,
                });
            await firestore
                .collection("user_orders")
                .doc(userUid)
                .collection("all_orders")
                .doc(orderId)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: true,
                        onWay: false,
                        isDelivered: true,
                    },
                    isDelivered: true,
                });
            let obj = order;
            deleteObjectProperty(obj, "status");
            deleteObjectProperty(obj, "id");
            obj.status = {
                isConfirm: true,
                isReadyToDeliver: true,
                onWay: false,
                isDelivered: true,
            };
            obj.isDelivered = true;
            await firestore.collection("delivered_orders").add(obj);
            await firestore
                .collection("users")
                .doc(uid)
                .collection("delivered_orders")
                .add(obj)
                .then(() => setLoading(false));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (orders && orders.length >= 1) {
            let temp = 0;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].isDelivered || !orders[i].status.isConfirm) {
                    temp += 1;
                }
            }
            if (temp === orders.length) setIsNoOrders(true);
            else setIsNoOrders(false);
        }
        const refreshInterval = setInterval(() => {
            setRefresh(!refresh);
        }, 3600000);

        return () => clearInterval(refreshInterval);
        //eslint-disable-next-line
    }, [refresh, orders]);
    return (
        <div className="container" style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center h3">
                                <span className="align-middle">Orders</span>
                            </div>
                            {requesting && !orders && (
                                <div className="text-center my-5">
                                    <div className="spinner-grow">
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                    <div className="text-muted mt-2">
                                        Ordres to pickup
                                    </div>
                                </div>
                            )}
                            {((orders && orders.length === 0) ||
                                isNoOrders) && (
                                <div className="my-5 text-muted text-center font-italic h6">
                                    [Sorry no orders for you at this moment.]
                                </div>
                            )}

                            {orders &&
                                orders.length > 0 &&
                                orders.map((order) => {
                                    let {
                                        userUid,
                                        uniqueID,
                                        status,
                                        deliveryPerson,
                                    } = order;
                                    //delivery person details
                                    let { isDeliveryPerson, email } = profile;
                                    if (
                                        status.isConfirm &&
                                        !order.isDelivered &&
                                        isDeliveryPerson &&
                                        (Object.keys(deliveryPerson).length ===
                                            0 ||
                                            (deliveryPerson &&
                                                deliveryPerson.email ===
                                                    email))
                                    ) {
                                        //full address
                                        let {
                                            street,
                                            city,
                                            state,
                                            zip_code,
                                        } = order.address;
                                        // time stuff
                                        let {
                                            date,
                                            monthInWords,
                                            year,
                                            hour,
                                            minutes,
                                        } = order.paymentTimeDetailed;
                                        let time = `${date} ${monthInWords}, ${year} ${hour}:${minutes}`;
                                        // let date = new Date(order.paymentTime);
                                        // let time = `${date.getDate()} ${
                                        //     months[parseInt(date.getMonth())]
                                        // },${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} `;
                                        let timeDifference = differenceBetweenDateInMinutes(
                                            new Date(),
                                            order.paymentTime
                                        );
                                        return (
                                            <div
                                                className="list-group"
                                                key={uniqueID}
                                            >
                                                <div className="list-group-item mt-2">
                                                    <div className="h6 text-muted">
                                                        Time of order:{" "}
                                                        {time && time}{" "}
                                                        {timeDifference &&
                                                            `  (${
                                                                parseInt(
                                                                    timeDifference
                                                                ) > 0
                                                                    ? `${parseInt(
                                                                          timeDifference
                                                                      )} minutes ago)`
                                                                    : "Just now)"
                                                            }`}
                                                    </div>
                                                    <div className=" h6 text-secondary">
                                                        Main order:
                                                        <div className="ml-2 mt-2">
                                                            {order.cart &&
                                                                order.cart
                                                                    .length >
                                                                    0 &&
                                                                order.cart.map(
                                                                    (item) => (
                                                                        <div
                                                                            key={
                                                                                item.uniqueId
                                                                            }
                                                                            className="media mt-2"
                                                                        >
                                                                            {/* <img
                                                                                src={
                                                                                    item.imageURL
                                                                                }
                                                                                width="50px"
                                                                                height="50px"
                                                                                alt=""
                                                                                className="align-self-center"
                                                                            /> */}
                                                                            {item.isVeg ? (
                                                                                <img
                                                                                    src="https://img.icons8.com/color/27/000000/vegetarian-food-symbol.png"
                                                                                    alt=""
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src="https://img.icons8.com/color/27/000000/non-vegetarian-food-symbol.png"
                                                                                    alt=""
                                                                                />
                                                                            )}
                                                                            <div className=" ml-2 media-body align-self-center h6">
                                                                                {
                                                                                    item.name
                                                                                }{" "}
                                                                                &times;{" "}
                                                                                {
                                                                                    item.times
                                                                                }
                                                                                {item.extraCheese && (
                                                                                    <div
                                                                                        className="font-italic text-muted"
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "13px",
                                                                                        }}
                                                                                    >
                                                                                        (with
                                                                                        extra
                                                                                        cheese)
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="h6 text-secondary">
                                                        Delivary Address:
                                                        <div className="mt-2 ml-2">
                                                            {street}, {city},{" "}
                                                            {state} {zip_code}
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    {Object.keys(deliveryPerson)
                                                        .length === 0 && (
                                                        <div className="btn-group btn-block my-2">
                                                            <button
                                                                className="btn btn-info"
                                                                onClick={() =>
                                                                    onOrderAccept(
                                                                        userUid,
                                                                        uniqueID
                                                                    )
                                                                }
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                className="btn btn-danger"
                                                                // onClick={() =>
                                                                //     onOrderCancel(
                                                                //         userUid,
                                                                //         uniqueID
                                                                //     )
                                                                // }
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>
                                                    )}
                                                    {Object.keys(deliveryPerson)
                                                        .length !== 0 &&
                                                        status &&
                                                        status.isConfirm &&
                                                        !status.isReadyToDeliver && (
                                                            <div>
                                                                <div className="h5 text-secondary text-center">
                                                                    Food is
                                                                    being
                                                                    prepared
                                                                </div>
                                                            </div>
                                                        )}
                                                    {Object.keys(deliveryPerson)
                                                        .length !== 0 &&
                                                        status &&
                                                        status.isConfirm &&
                                                        status.isReadyToDeliver &&
                                                        !status.onWay && (
                                                            <div>
                                                                <div className="h5 text-secondary text-center">
                                                                    Food is
                                                                    ready!
                                                                    <div>
                                                                        You can
                                                                        pick up
                                                                        now.
                                                                    </div>
                                                                </div>
                                                                <div className="btn-group btn-block">
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() =>
                                                                            onOrderPickedUp(
                                                                                userUid,
                                                                                uniqueID
                                                                            )
                                                                        }
                                                                    >
                                                                        Picked
                                                                        up
                                                                    </button>
                                                                    <button className="btn btn-danger">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    {Object.keys(deliveryPerson)
                                                        .length !== 0 &&
                                                        status &&
                                                        status.isConfirm &&
                                                        status.isReadyToDeliver &&
                                                        status.onWay &&
                                                        !status.isDelivered && (
                                                            <div className="btn-group btn-block">
                                                                <div
                                                                    className="btn btn-success"
                                                                    onClick={() =>
                                                                        onOrderDelivered(
                                                                            userUid,
                                                                            uniqueID,
                                                                            order
                                                                        )
                                                                    }
                                                                >
                                                                    Deliverd
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    } else return null;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersToPickup;
