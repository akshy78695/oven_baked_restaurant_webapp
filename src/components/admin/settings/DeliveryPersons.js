import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

const DeliveryPersons = () => {
    useFirestoreConnect([
        { collection: "delivery_persons", storeAs: "delivery_persons" },
    ]);
    const deliveryPersons = useSelector(
        (state) =>
            state.firestore.ordered && state.firestore.ordered.delivery_persons
    );
    const requesting = useSelector(
        (state) =>
            state.firestore.ordered &&
            state.firestore.status.requesting.delivery_persons
    );
    console.log(deliveryPersons);
    return (
        <div className="container" style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center h3 mb-3 text-secondary">
                                Delivery Persons
                            </div>
                            {deliveryPersons !== undefined &&
                                deliveryPersons.length > 0 &&
                                deliveryPersons.map((person) => {
                                    const {
                                        date,
                                        month,
                                        year,
                                    } = person.createdAtDetailed;
                                    return (
                                        <div
                                            className="card"
                                            key={person.uniqueId}
                                        >
                                            <div className="card-body">
                                                <div className="h6 text-secondary">
                                                    {person.name}
                                                </div>

                                                <div className="text-secondary">
                                                    Email:{" "}
                                                    <span className="text-muted font-weight-bold">
                                                        {person.email}
                                                    </span>
                                                </div>
                                                <div className="text-secondary">
                                                    Security code:{" "}
                                                    <span className="text-muted font-weight-bold">
                                                        {person.pin}
                                                    </span>
                                                </div>
                                                <hr className="my-1" />
                                                <div className="float-right">
                                                    <span className="text-muted font-italic">
                                                        Created at:{" "}
                                                        {`${date}/${month}/${year}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            {deliveryPersons !== undefined &&
                                deliveryPersons.length === 0 && (
                                    <div className="text-center text-secondary mt-5">
                                        <div>
                                            <img
                                                src="https://img.icons8.com/color/48/000000/break--v4.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            You don't have any delivery person{" "}
                                        </div>
                                        <div className="">
                                            <Link to="/delivery_person/add">
                                                <button className="btn btn-outline-dark my-3 btn-sm">
                                                    Add one
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            {requesting && !deliveryPersons && (
                                <div className="text-center my-4">
                                    <div className="spinner-grow">
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPersons;
