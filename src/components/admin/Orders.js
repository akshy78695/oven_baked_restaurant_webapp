import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { differenceBetweenDateInMinutes } from "../helpers/timeDifference";

const Orders = () => {
    const [isNoOrders, setIsNoOrders] = useState(false);
    const [refresh, setRefresh] = useState(false);
    useFirestoreConnect([
        {
            collection: "orders",
            orderBy: ["paymentTime", "desc"],
            storeAs: "orders",
        },
    ]);
    const firestore = useFirestore();
    const orders = useSelector(
        (state) => state.firestore && state.firestore.ordered.orders
    );
    console.log(orders);
    const onOrderAccept = async (uid, orderId) => {
        try {
            await firestore
                .collection("orders")
                .doc(uid)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: false,
                        onWay: false,
                        isDelivered: false,
                    },
                });
            await firestore
                .collection("user_orders")
                .doc(uid)
                .collection("all_orders")
                .doc(orderId)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: false,
                        onWay: false,
                        isDelivered: false,
                    },
                });
        } catch (error) {
            console.log(error.message);
        }
    };
    const onReadyToDeliver = async (uid, orderId) => {
        try {
            await firestore
                .collection("orders")
                .doc(uid)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: true,
                        onWay: false,
                        isDelivered: false,
                    },
                });
            await firestore
                .collection("user_orders")
                .doc(uid)
                .collection("all_orders")
                .doc(orderId)
                .update({
                    status: {
                        isConfirm: true,
                        isReadyToDeliver: true,
                        onWay: false,
                        isDelivered: false,
                    },
                });
        } catch (error) {
            console.log(error.message);
        }
    };
    const onOrderCancel = async (uid, orderId) => {
        try {
            await firestore
                .collection("orders")
                .doc(uid)
                .update({ isCancelledByRestaurant: true });
            await firestore
                .collection("user_orders")
                .doc(uid)
                .collection("all_orders")
                .doc(orderId)
                .update({ isCancelledByRestaurant: true });
        } catch (error) {
            console.log(error.message);
        }
        console.log(uid);
    };
    useEffect(() => {
        const autoCancelOrder = async (orderId) => {
            if (orderId)
                await firestore
                    .collection("orders")
                    .doc(orderId)
                    .update({ isCancelledByRestaurant: true });
        };
        const autoDeleteOrder = async (orderId) => {
            if (orderId)
                await firestore.collection("orders").doc(orderId).delete();
        };

        if (orders && orders.length > 0) {
            let refreshInterval = setInterval(() => {
                setRefresh(!refresh);
            }, 60000);
            if (orders && orders.length >= 1) {
                let temp = 0;
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].isDelivered) {
                        temp += 1;
                        console.log(
                            differenceBetweenDateInMinutes(
                                new Date(),
                                orders[i].paymentTime
                            )
                        );
                        if (
                            parseInt(
                                differenceBetweenDateInMinutes(
                                    new Date(),
                                    orders[i].paymentTime
                                )
                            ) > 60
                        ) {
                            autoCancelOrder(orders[i].id);
                        }
                    }
                    if (
                        parseInt(
                            differenceBetweenDateInMinutes(
                                new Date(),
                                orders[i].paymentTime
                            )
                        ) > 720
                    ) {
                        autoDeleteOrder(orders[i].id);
                    }
                }
                if (temp === orders.length) setIsNoOrders(true);
                else setIsNoOrders(false);
            }
            return () => {
                return clearInterval(refreshInterval);
            };
        }
        // let refreshInterval;
        // if (orders && orders.length > 0) {
        //     refreshInterval = setInterval(() => {
        //         setRefresh(!refresh);
        //     }, 60000);
        // }
        // return () => {
        //     if (orders && orders.length > 0) {
        //         return clearInterval(refreshInterval);
        //     }
        // };
        //eslint-disable-next-line
    }, [refresh, orders]);
    return (
        <div className="container" style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className={`card `}>
                        <div className="card-body">
                            <div className="text-center h3 mb-3">Orders</div>
                            {orders &&
                                orders.length > 0 &&
                                orders.map((order, i) => {
                                    let {
                                        user,
                                        uniqueID,
                                        isCancelledByRestaurant,
                                        isCancelledByUser,
                                        status,
                                        deliveryPerson,
                                    } = order;
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
                                    if (!order.isDelivered)
                                        return (
                                            <div
                                                className="list-group"
                                                key={uniqueID}
                                            >
                                                <div className="list-group-item mt-2 border-primary">
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
                                                                                item.id
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
                                                    <div className="h6 text-secondary">
                                                        Delivary Address:
                                                        <div className="mt-2 ml-2">
                                                            {street}, {city},{" "}
                                                            {state} {zip_code}
                                                        </div>
                                                    </div>
                                                    <hr className="" />
                                                    {!isCancelledByRestaurant &&
                                                        !isCancelledByUser &&
                                                        !status.isConfirm && (
                                                            <div className="text-center row">
                                                                <div className="col-6">
                                                                    <button
                                                                        className="btn btn-outline-success btn-block"
                                                                        onClick={() =>
                                                                            onOrderAccept(
                                                                                user.uid,
                                                                                uniqueID
                                                                            )
                                                                        }
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                </div>
                                                                <div className="col-6">
                                                                    <button
                                                                        className="btn btn-outline-danger btn-block"
                                                                        onClick={() =>
                                                                            onOrderCancel(
                                                                                user.uid,
                                                                                uniqueID
                                                                            )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            Cancel
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    {status.isConfirm &&
                                                        !status.isReadyToDeliver && (
                                                            <div className="mt-3">
                                                                <button
                                                                    className="btn btn-outline-success btn-block"
                                                                    onClick={() =>
                                                                        onReadyToDeliver(
                                                                            user.uid,
                                                                            uniqueID
                                                                        )
                                                                    }
                                                                >
                                                                    Ready to
                                                                    deliver
                                                                </button>{" "}
                                                                {Object.keys(
                                                                    deliveryPerson
                                                                ).length !==
                                                                    0 && (
                                                                    <div className="text-center h6 text-secondary my-2">
                                                                        <span className="text-muted">
                                                                            {
                                                                                deliveryPerson.name
                                                                            }{" "}
                                                                        </span>
                                                                        will be
                                                                        delivering
                                                                        this
                                                                        order.
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    {/* isReady to deliver but no delivery guy :( */}
                                                    {Object.keys(deliveryPerson)
                                                        .length === 0 &&
                                                        status.isConfirm &&
                                                        status.isReadyToDeliver &&
                                                        !status.onWay && (
                                                            <div className="text-center">
                                                                <span className="h5 text-danger">
                                                                    This order
                                                                    is waiting
                                                                    for a
                                                                    <br />
                                                                    delivery
                                                                    guy.
                                                                </span>
                                                            </div>
                                                        )}
                                                    {/* isReady to deliver and accepted by delivery guy :) */}
                                                    {Object.keys(deliveryPerson)
                                                        .length !== 0 &&
                                                        status.isConfirm &&
                                                        status.isReadyToDeliver &&
                                                        !status.onWay && (
                                                            <div className="text-center">
                                                                <span className="h5 text-info">
                                                                    {
                                                                        deliveryPerson.name
                                                                    }{" "}
                                                                    will pick
                                                                    this order
                                                                    soon.
                                                                </span>
                                                            </div>
                                                        )}
                                                    {/* order on its way */}
                                                    {Object.keys(deliveryPerson)
                                                        .length !== 0 &&
                                                        status.isConfirm &&
                                                        status.isReadyToDeliver &&
                                                        status.onWay &&
                                                        !status.isDelivered && (
                                                            <div className="text-center">
                                                                <span className="h5 text-success">
                                                                    Order on its
                                                                    way.
                                                                    <div className="font-italic h6">
                                                                        (By "
                                                                        {
                                                                            deliveryPerson.name
                                                                        }
                                                                        " )
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        )}
                                                    {isCancelledByUser &&
                                                        !isCancelledByRestaurant && (
                                                            <div>
                                                                <button
                                                                    className="btn btn-outline-danger btn-block disabled"
                                                                    disabled
                                                                >
                                                                    Cancelled by
                                                                    user
                                                                </button>{" "}
                                                            </div>
                                                        )}
                                                    {!isCancelledByUser &&
                                                        isCancelledByRestaurant && (
                                                            <div>
                                                                <button
                                                                    className="btn btn-outline-danger btn-block disabled"
                                                                    disabled
                                                                >
                                                                    Cancelled by
                                                                    restaurant
                                                                </button>{" "}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    else return null;
                                })}
                            {!orders && (
                                <div className="text-center my-5">
                                    <div
                                        className="spinner-grow"
                                        style={{
                                            height: "2rem",
                                            width: "2rem",
                                        }}
                                    >
                                        <div className="sr-only">Loading</div>
                                    </div>
                                    <div className="h6 mt-2 text-muted">
                                        Your Orders...
                                    </div>
                                </div>
                            )}
                            {((orders && orders.length === 0) ||
                                isNoOrders) && (
                                <div className="mt-5 mb-4 text-center">
                                    <span
                                        className="h5 text-muted font-italic"
                                        style={{ fontSize: "18px" }}
                                    >
                                        Sorry, no orders at this moment :(
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
