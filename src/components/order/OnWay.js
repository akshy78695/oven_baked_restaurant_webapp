import React from "react";

const OnWay = ({ deliveryPerson }) => {
    return (
        <div className="card p-1">
            <div className="card-body p-1">
                <h2 className="text-center my-3">On its way</h2>
                <div className="mt-2">
                    <img src="/images/onWay.gif" alt="" className="img-fluid" />
                </div>
                {deliveryPerson && (
                    <div className="text-center h6 text-secondary">
                        Your order will be deliver <br /> by{" "}
                        {`"${deliveryPerson.name}"`}
                        <div>
                            <a
                                href={`tel:+91${deliveryPerson.phone}`}
                                className="mt-2"
                            >
                                Call him
                            </a>
                        </div>
                    </div>
                )}
                <div className="text-center my-4">
                    <button
                        className="btn btn-warning text-white text-decoration-none"
                        disabled
                    >
                        Track my order.
                    </button>
                </div>
                <div className=" mb-3">
                    <span className="float-right btn-link">Have an issue?</span>
                </div>
            </div>
        </div>
    );
};

export default OnWay;
