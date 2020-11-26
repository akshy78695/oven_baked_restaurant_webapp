import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useState } from "react";
import LeftArrowBoxSvg from "../svg's/LeftArrowBoxSvg";
import cuid from "cuid";
import { useSelector } from "react-redux";

const AddressSettings = ({ profile, history }) => {
    const [newAddressForm, setNewAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
    });
    const redirectToAddress = useSelector(
        (state) => state.helper && state.helper.redirectToAddress
    );
    const firebase = useFirebase();
    let { addresses, isLoaded } = profile;
    const onDelete = async (id, e) => {
        let updatedAddresses = addresses.filter((add) => add.id !== id);
        console.log(updatedAddresses);
        await firebase.updateProfile({ addresses: updatedAddresses });
    };
    const changeAddressForm = (e) => {
        setNewAddressForm(!newAddressForm);
    };
    const onChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        newAddress.id = cuid();
        let array = [];
        array = addresses || [];
        array.push(newAddress);
        await firebase.updateProfile({ addresses: array });
        if (redirectToAddress) {
            setNewAddress({
                name: "",
                street: "",
                city: "",
                state: "",
                zip_code: "",
            });
            history.push("/delivery_info");
        } else {
            setNewAddressForm(false);
            setNewAddress({
                name: "",
                street: "",
                city: "",
                state: "",
                zip_code: "",
            });
        }
    };
    const { name, street, city, state, zip_code } = newAddress;
    return (
        <div className="card mb-3">
            <div className="card-title mb-0 py-2 h4 text-center">
                Manage Addresses
            </div>
            {!newAddressForm && (
                <div className="card-body px-2">
                    <div className="list-group list-group-flush">
                        {isLoaded ? (
                            addresses !== undefined ? (
                                addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className="list-group-item mb-2 border"
                                    >
                                        <div className="d-flex h5 align-items-center justify-content-between">
                                            {address.name}
                                            <span
                                                className="h4 text-danger"
                                                style={{ cursor: "pointer" }}
                                                onClick={(e) =>
                                                    onDelete(address.id, e)
                                                }
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Delete Address"
                                            >
                                                &times;
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-muted">
                                                {address.street},{address.city},
                                                {address.state}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted font-italic">
                                    No address saved.
                                </div>
                            )
                        ) : (
                            <div className="text-center">
                                <div className="spinner-border my-3">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className="btn btn-outline-dark btn-block my-3"
                        onClick={changeAddressForm}
                    >
                        Add new address
                    </div>
                </div>
            )}
            {newAddressForm && (
                <div className="card-body">
                    <div className="h5 mx-md-3 text-center">
                        <span
                            className="float-left"
                            onClick={changeAddressForm}
                            style={{ cursor: "pointer" }}
                        >
                            <LeftArrowBoxSvg width="1.6em" height="1.5em" />
                        </span>
                        <span className="mr-md-4">Create new address</span>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label
                                htmlFor="name"
                                className="text-secondary ml-2"
                            >
                                Enter name:{" "}
                            </label>
                            <input
                                type="text"
                                placeholder="for e.g. home, work, etc."
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="street"
                                className="text-secondary ml-2"
                            >
                                street:{" "}
                            </label>
                            <input
                                name="street"
                                placeholder="for e.g. El/52, Electronic Zone"
                                className="form-control"
                                value={street}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="city"
                                className="text-secondary ml-2"
                            >
                                city:{" "}
                            </label>
                            <input
                                name="city"
                                type="text"
                                placeholder="for e.g. mumbai"
                                className="form-control"
                                value={city}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="state"
                                className="text-secondary ml-2"
                            >
                                state:{" "}
                            </label>
                            <input
                                name="state"
                                type="text"
                                placeholder="for e.g. maharashtra"
                                className="form-control"
                                value={state}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="zip_code"
                                className="text-secondary ml-2"
                            >
                                zip code:{" "}
                            </label>
                            <input
                                name="zip_code"
                                type="text"
                                placeholder="for e.g. 400012"
                                className="form-control"
                                value={zip_code}
                                onChange={onChange}
                                minLength="4"
                                maxLength="8"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-dark btn-block"
                        >
                            Add address
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddressSettings;
