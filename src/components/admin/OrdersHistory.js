import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
    differenceBetweenDateInMinutes,
    howMuchTimeAgo,
} from "../helpers/timeDifference";

const OrdersHistory = () => {
    useFirestoreConnect([
        {
            collection: "delivered_orders",
            orderBy: ["paymentTime", "desc"],
            storeAs: "deliveredOrders",
        },
    ]);
    const { orders, requesting } = useSelector((state) => ({
        orders:
            state.firestore.ordered.deliveredOrders &&
            state.firestore.ordered.deliveredOrders,
        requesting: state.firestore.status.requesting.deliveredOrders,
    }));
    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
                <div className="col-md-8 col-lg-7 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="my-3 text-center h4">
                                Orders History
                            </div>
                            {requesting && !orders && (
                                <div className="text-center my-5">
                                    <div className="spinner-grow">
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                    <div className="text-muted mt-2">
                                        Orders
                                    </div>
                                </div>
                            )}
                            {orders &&
                                orders.length > 0 &&
                                orders.map((order) => {
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
                                    let {
                                        // user,
                                        // userUid,
                                        // uniqueID,
                                        // isCancelledByRestaurant,
                                        // isCancelledByUser,
                                        // status,
                                        deliveryPerson,
                                    } = order;
                                    let time = `${date} ${monthInWords}, ${year} ${hour}:${minutes}`;
                                    let timeDifference = differenceBetweenDateInMinutes(
                                        new Date(),
                                        order.paymentTime
                                    );
                                    timeDifference = parseInt(timeDifference);
                                    return (
                                        <div
                                            className="card my-2"
                                            key={order.uniqueID}
                                        >
                                            <div className="card-body">
                                                <div className="">
                                                    <div className="h6 text-muted">
                                                        Time of order:{" "}
                                                        {time && time}{" "}
                                                        {/* {timeDifference &&
                                                    `  (${
                                                        timeDifference > 0
                                                            ? `${timeDifference} minutes ago)`
                                                            : "Just now)"
                                                    }`} */}
                                                        {timeDifference &&
                                                            `(${howMuchTimeAgo(
                                                                timeDifference
                                                            )})`}
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
                                                                                    src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
                                                                                    alt=""
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
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
                                                    <div className="h6 text-secondary">
                                                        Delivared By:
                                                        <div className="mt-2 ml-2">
                                                            name:{" "}
                                                            {
                                                                deliveryPerson.name
                                                            }
                                                            <br />
                                                            phone:{" "}
                                                            <a
                                                                href={`tel:${deliveryPerson.phone}`}
                                                            >
                                                                {
                                                                    deliveryPerson.phone
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersHistory;
