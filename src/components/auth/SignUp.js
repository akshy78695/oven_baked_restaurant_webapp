import React from "react";
import { useSelector } from "react-redux";
import SignUpForm from "./SignUpForm";

const SignUp = ({ history }) => {
    const { authIsEmpty, authIsLoaded } = useSelector((state) => ({
        authIsEmpty: state.firebase.auth.isEmpty,
        authIsLoaded: state.firebase.auth.isLoaded,
    }));

    if (authIsLoaded)
        return (
            <div className="" style={{ marginTop: "60px" }}>
                <div className="row mx-0">
                    <div className="col-md-6 mx-auto">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block  p-0">
                                <img
                                    src="/images/signup.jpg"
                                    alt=""
                                    className="img-fluid "
                                />
                            </div>
                            <div
                                className="col-lg-7 mx-auto border"
                                style={{ maxWidth: "350px" }}
                            >
                                <SignUpForm
                                    history={history}
                                    authIsEmpty={authIsEmpty}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <span
                    className="d-none d-lg-block"
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        right: "10px",
                        fontSize: "12px",
                    }}
                >
                    Photo by{" "}
                    <a href="https://unsplash.com/@luisherdt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Luis Herdt
                    </a>{" "}
                    on{" "}
                    <a href="https://unsplash.com/s/photos/pizza?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Unsplash
                    </a>
                </span>
            </div>
        );
    return (
        <div>
            <div className="text-center" style={{ marginTop: "40vh" }}>
                <div className="spinner-grow">
                    <span className="sr-only">Loading..</span>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
