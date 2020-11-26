import React from "react";

const Cooking = () => {
    return (
        <div className="card">
            <div className="card-body px-1">
                <div className="text-center my-4">
                    <img
                        src="/images/cookingChef.gif"
                        className="img-responsive"
                        alt=""
                    />
                    <div className="h5 text-center my-3">
                        Your order is being processed.
                    </div>
                    <div
                        className="h6 text-center text-muted mt-2"
                        style={{ fontSize: "15px" }}
                    >
                        Sit back and relax. Your order will be deliver soon{" "}
                        <br /> by one of our delivary guy.
                    </div>
                    <div
                        className="text-center text-muted my-4 h6 font-weight-normal"
                        style={{ fontSize: "15px" }}
                    >
                        Have a question about your order?
                        <br /> Call restaurant -
                        <a
                            href="tel:!918097534684"
                            className="btn btn-link text-decoration-none"
                        >
                            022-64563748
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cooking;
