import React, { useRef } from "react";
import { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const BasicSettings = ({ auth }) => {
    const firebase = useFirebase();
    const [log, setLog] = useState({
        name: "",
        description: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isSubmited, setIsSubmitted] = useState(false);
    const isMounted = useRef(true);
    const { basic, isLoaded } = useSelector(
        (state) => state.firebase && state.firebase.profile
    );
    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        setLog({ ...log, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        setIsSubmitted(true);
    };
    useEffect(() => {
        isMounted.current = true;
        if (basic) {
            setLog(basic);
        }
        const updateProfile = async () => {
            setIsSubmitted(false);
            await firebase.updateProfile({ basic: log }).then(() => {
                if (isMounted.current) {
                    setLoading(false);
                    setIsUpdated(true);
                    setTimeout(() => setIsUpdated(false), 2000);
                }
            });
        };
        if (isSubmited) {
            updateProfile();
        }
        return () => {
            isMounted.current = false;
        };
        //eslint-disable-next-line
    }, [basic, isSubmited]);
    let { name, description, phone } = log;
    return (
        <div className="card">
            <form onSubmit={onSubmit}>
                <div className="h4 card-title p-2 text-center">
                    Basic settings
                </div>

                <div className="card-body">
                    <div className="form-group ">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter your full name"
                            disabled={!isLoaded}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone: </label>
                        <input
                            type="text"
                            name="phone"
                            onChange={onChange}
                            value={phone}
                            className="form-control"
                            placeholder="your 10 digit phone number"
                            disabled={!isLoaded}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <textarea
                            rows="2"
                            maxLength="100"
                            type="text"
                            name="description"
                            value={description}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Tell us a little something about yourself"
                            disabled={!isLoaded}
                        />
                    </div>
                    {isUpdated && (
                        <div className="w-100">
                            <div className="text-center h6 text-primary">
                                Updated :)
                            </div>
                        </div>
                    )}
                    {!isLoaded && (
                        <div className="text-center h6 text-primary font-italic">
                            Loading...
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn btn-outline-dark btn-block my-4"
                    >
                        {loading ? (
                            <div className="spinner-border">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <span>Update</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BasicSettings;
