import cuid from "cuid";
import React from "react";
import { useState } from "react";
import { useFirestore } from "react-redux-firebase";

const generatePin = (email) => {
    let pin = "";
    if (email.length >= 2) {
        let i = 0;
        while (pin.length < 4) {
            pin += email.charCodeAt(i);
            i++;
        }
    }
    return pin;
};
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

const AddDeliveryPerson = ({ history }) => {
    const [ID, setID] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingForSave, setLoadingForSave] = useState(false);
    const [showIDInstructions, setShowIDInstructions] = useState(false);
    const firestore = useFirestore();
    const onChange = (e) => {
        if (emailNotFound) setEmailNotFound(false);
        if (e.target.name === "id") setID(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (emailNotFound) setEmailNotFound(false);
        setLoading(true);
        if (email.length === 0) {
            if (ID.length < 100) {
                await firestore.get(`users/${ID}`).then((res) => {
                    const data = res.data();
                    if (data !== undefined) {
                        if (data.email) {
                            const { email } = data;
                            setEmail(email);
                            console.log(email);
                        }
                    } else {
                        setEmailNotFound(true);
                    }
                });
            } else {
                setEmailNotFound(true);
            }
        }

        setLoading(false);
    };
    const onEmailConfirm = () => {
        setIsEmailConfirmed(true);
        generatePin(email);
    };
    const onSave = async () => {
        setLoadingForSave(true);
        let obj = {};
        obj.uniqueId = cuid();
        obj.email = email;
        obj.name = name;
        obj.phone = phone;
        obj.pin = generatePin(email);
        obj.isDeliveryPerson = true;
        obj.createdAt = Date.now();
        //for detailed date
        let temp = new Date(obj.createdAt);
        obj.createdAtDetailed = {
            date: temp.getDate(),
            month: parseInt(temp.getMonth()) + 1,
            monthInWords: months[parseInt(temp.getMonth())],
            year: temp.getFullYear(),
            hour: temp.getHours(),
            minutes: temp.getMinutes(),
            seconds: temp.getSeconds(),
        };
        console.log(obj);
        try {
            await firestore.collection("delivery_persons").add(obj);
            await firestore
                .collection("users")
                .doc(`${ID}`)
                .set(obj, { merge: true })
                .then(() => {
                    setLoading(false);
                    history.push("/delivery_person");
                });
        } catch (error) {
            console.log(error);
            setLoadingForSave(false);
        }
    };
    return (
        <div className="container" style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center text-secondary h4">
                                Add delivery person
                            </div>
                            <form className="my-3" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="id">User's id: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="id"
                                        value={ID}
                                        disabled={email}
                                        onChange={onChange}
                                    />
                                    {!showIDInstructions && email.length === 0 && (
                                        <div>
                                            <span
                                                className="float-right btn btn-link text-decoration-none"
                                                style={{ fontSize: "16px" }}
                                                onClick={() =>
                                                    setShowIDInstructions(
                                                        !showIDInstructions
                                                    )
                                                }
                                            >
                                                Where can i find it?
                                            </span>
                                        </div>
                                    )}
                                    {showIDInstructions && (
                                        <div className="container">
                                            <div className="card my-3  border-warning">
                                                <div className="card-body">
                                                    <div
                                                        className="text-muted"
                                                        style={{
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        <p className="mb-0">
                                                            step 1. Login as
                                                            Delivery person's
                                                            account
                                                        </p>
                                                        <p className="mb-0">
                                                            step 2. Go to
                                                            Settings/Account
                                                            (copy ID from
                                                            there).
                                                        </p>
                                                        <p className="mb-0">
                                                            step 3. Paste it
                                                            above.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div className="float-right">
                                                            <button
                                                                className="btn btn-link btn-sm text-decoration-none"
                                                                onClick={() =>
                                                                    setShowIDInstructions(
                                                                        !showIDInstructions
                                                                    )
                                                                }
                                                            >
                                                                I Understood
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {emailNotFound && (
                                    <div className="mt-5">
                                        <div
                                            className="alert alert-warning h6"
                                            role="alert"
                                        >
                                            User not found!
                                        </div>
                                    </div>
                                )}
                                {email && (
                                    <div className="my-3">
                                        <div className="text-center">
                                            <span className="h6 text-secondary">
                                                Email Found:
                                            </span>
                                            <span className="h6">
                                                {" "}
                                                "{email}"{" "}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    {email ? (
                                        isEmailConfirmed ? (
                                            <div>
                                                <div className="text-center h5 text-muted">
                                                    Confirmed!
                                                </div>
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="name"
                                                        className="h6 text-secondary"
                                                    >
                                                        Enter name for{" "}
                                                        <span className="text-muted">
                                                            {email ? email : ""}
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="phone"
                                                        className="h6 text-secondary"
                                                    >
                                                        Phone:{" "}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="phone"
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="my-2 ml-2">
                                                    {name.length < 4 && (
                                                        <div
                                                            className="text-danger"
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            * Name required.
                                                        </div>
                                                    )}
                                                    {phone.length < 10 && (
                                                        <div
                                                            className="text-danger"
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            * Valid phone
                                                            required.
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    className="btn btn-block btn-primary"
                                                    onClick={onSave}
                                                    disabled={
                                                        name.length > 0
                                                            ? phone.length > 9
                                                                ? false
                                                                : true
                                                            : true
                                                    }
                                                >
                                                    {loadingForSave ? (
                                                        <div className="text-center">
                                                            <div
                                                                className="spinner-border"
                                                                style={{
                                                                    width:
                                                                        "1.5rem",
                                                                    height:
                                                                        "1.5rem",
                                                                }}
                                                            >
                                                                <span className="sr-only">
                                                                    Loading...
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span>Save</span>
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="btn-group btn-block"
                                                role="group"
                                            >
                                                <button
                                                    className="btn btn-info"
                                                    onClick={onEmailConfirm}
                                                >
                                                    <span>Confirm</span>
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => setEmail("")}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block"
                                            disabled={
                                                ID.length > 20 ? false : true
                                            }
                                            onClick={onSubmit}
                                        >
                                            {loading ? (
                                                <div className="text-center">
                                                    <div
                                                        className="spinner-border"
                                                        style={{
                                                            width: "1.5rem",
                                                            height: "1.5rem",
                                                        }}
                                                    >
                                                        <span className="sr-only">
                                                            Loading...
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span>Submit</span>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDeliveryPerson;
