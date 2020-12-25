import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import cuid from "cuid";
import { useFirestore } from "react-redux-firebase";
import Alert from "../layout/Alert";
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const PaymentOption = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const firestore = useFirestore();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart && state.cart.pizzaInCart);
    const { address, totalBill, pickupByHimself } = useSelector(
        (state) => state.helper && state.helper
    );
    const alert = useSelector((state) => state.alert);
    const { auth, profile } = useSelector((state) => ({
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        email: state.firebase.profile.email,
    }));
    const onSubmit = async (paymentType, e) => {
        setLoading(true);
        let userDetails = profile && profile.basic;
        let obj = {};
        obj.cart = cart.filter((item) => {
            if (item.userUid === undefined) {
                item.userUid = auth.uid;
                return item;
            } else return item;
        });
        obj.uniqueID = cuid();
        obj.paymentTime = Date.now();
        obj.paymentType = paymentType;
        obj.totalBill = totalBill;
        obj.status = {
            isConfirm: false,
            isReadyToDeliver: false,
            onWay: false,
            isDelivered: false,
        };
        obj.isCancelledByRestaurant = false;
        obj.isCancelledByUser = false;
        obj.isDelivered = false;
        obj.userUid = auth.uid;
        obj.address = address;
        obj.user = { uid: auth.uid, ...userDetails };
        //calculating cart quantity
        let totalQuantity = 0;
        for (let i = 0; i < cart.length; i++) {
            totalQuantity += cart[i].times;
        }
        obj.totalQuantity = totalQuantity;
        //for detailed date
        let temp = new Date(obj.paymentTime);
        obj.paymentTimeDetailed = {
            date: temp.getDate(),
            month: parseInt(temp.getMonth()) + 1,
            monthInWords: months[parseInt(temp.getMonth())],
            year: temp.getFullYear(),
            hour: temp.getHours(),
            minutes: temp.getMinutes(),
            seconds: temp.getSeconds(),
        };
        if (pickupByHimself) {
            let { name, email, phone } = profile;
            let { uid } = auth;
            obj.deliveryPerson = {
                name,
                email,
                phone,
                uid,
                uniqueId: obj.uniqueID,
            };
        } else {
            obj.deliveryPerson = {};
        }
        obj.writable = true;
        try {
            await firestore.collection("orders").doc(auth.uid).set(obj);
            await firestore
                .collection("user_orders")
                .doc(obj.user.uid)
                .collection("all_orders")
                .doc(obj.uniqueID)
                .set(obj)
                .then(() => setLoading(false));
            dispatch({ type: "CLEAR_CART" });
            history.push("/order");
        } catch (error) {
            console.log(error);
            dispatch({
                type: "SET_ALERT",
                payload: { message: error.message },
            });
            setLoading(false);
        }
    };
    if ((cart && cart.length === 0) || address === null) {
        if (address === null) return <Redirect to="/delivery_info" />;
        else return <Redirect to="/cart" />;
    }
    if (cart && cart.length > 0) {
        return (
            <div style={{ marginTop: "60px" }} className="mx-1 row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-title">
                            <div className="h5 pb-0 px-3 pt-3 ">
                                Choose payment method
                            </div>
                        </div>
                        <div className="card-body px-0">
                            {alert && alert.message && <Alert />}
                            <div
                                className="nav flex-row nav-tabs"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <a
                                    className="nav-link active"
                                    id="cash-on-delivery-tab"
                                    data-toggle="pill"
                                    href="#cash-on-delivery"
                                    role="tab"
                                    aria-controls="cash-on-delivery"
                                    aria-selected="true"
                                    style={{
                                        fontWeight: "normal",
                                        fontSize: "16px",
                                        WebkitTextStrokeWidth: "0",
                                    }}
                                >
                                    COD
                                </a>
                                <a
                                    className="nav-link"
                                    id="credit-card-tab"
                                    data-toggle="pill"
                                    href="#credit-card"
                                    role="tab"
                                    aria-controls="credit-card"
                                    aria-selected="false"
                                    style={{
                                        fontWeight: "normal",
                                        fontSize: "16px",
                                        WebkitTextStrokeWidth: "0",
                                    }}
                                >
                                    Card
                                </a>
                                <a
                                    className="nav-link"
                                    id="upi-tab"
                                    data-toggle="pill"
                                    href="#upi"
                                    role="tab"
                                    aria-controls="upi"
                                    aria-selected="false"
                                    style={{
                                        fontWeight: "normal",
                                        fontSize: "16px",
                                        WebkitTextStrokeWidth: "0",
                                    }}
                                >
                                    UPI
                                </a>
                            </div>
                            <div
                                className="tab-content px-2"
                                id="v-pills-tabContent"
                            >
                                <div
                                    className="tab-pane fade show active"
                                    id="cash-on-delivery"
                                    role="tabpanel"
                                    aria-labelledby="cash-on-delivery-tab"
                                >
                                    <div className="ml-3 mt-3 h6">
                                        <input
                                            type="radio"
                                            checked={true}
                                            id="cod"
                                            readOnly
                                        />
                                        <label htmlFor="cod" className="ml-2">
                                            Cash on delivary
                                        </label>
                                    </div>
                                    <div className="">
                                        <div
                                            className="btn btn-outline-dark btn-block"
                                            onClick={(e) => onSubmit("COD", e)}
                                        >
                                            {loading ? (
                                                <div
                                                    className="spinner-border"
                                                    style={{
                                                        width: "1.4rem",
                                                        height: "1.4rem",
                                                    }}
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                            ) : (
                                                <span>Submit</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="credit-card"
                                    role="tabpanel"
                                    aria-labelledby="credit-card-tab"
                                >
                                    <form>
                                        <div className="text-center my-2 text-muted">
                                            !Not available right now.
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Card holder name"
                                                name="name"
                                                className="form-control form-control-lg mt-2"
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                name="number"
                                                placeholder="Card number"
                                                className="form-control form-control-lg mt-2"
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="expiry-date">
                                                        expiry date
                                                    </label>
                                                    <input
                                                        type="month"
                                                        value="2024-04"
                                                        className="form-control"
                                                        name="expiry"
                                                        id="debit-expiry-date"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label
                                                        htmlFor="cvv"
                                                        className=""
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="cvv"
                                                        id="debit-cvv"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group ml-3">
                                            <input
                                                type="checkbox"
                                                name=""
                                                className="form-check-input"
                                                id="debit-save-card"
                                                disabled
                                            />
                                            <label
                                                htmlFor="save-card"
                                                className="form-check-label"
                                            >
                                                Save Card for faster checkout
                                            </label>
                                        </div>
                                        <button
                                            className="mt-3 btn btn-block btn-outline-dark"
                                            disabled
                                        >
                                            pay ₹ {totalBill}
                                        </button>
                                    </form>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="upi"
                                    role="tabpanel"
                                    aria-labelledby="upi-tab"
                                >
                                    <form>
                                        <div className="text-center my-2 text-muted">
                                            !Not available right now.
                                        </div>
                                        <div className="form-group  ">
                                            <label htmlFor="id">
                                                <span className="ml-2">
                                                    your upi ID:
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. your-number @-upi"
                                                disabled
                                            />
                                        </div>
                                        <button
                                            className="mt-3 btn btn-block btn-outline-dark"
                                            disabled
                                        >
                                            Verify and pay ₹ {totalBill}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default PaymentOption;
