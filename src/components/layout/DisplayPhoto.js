import React from "react";
import { useEffect } from "react";
import "./layoutStyle.css";

const DisplayPhoto = ({
    photoForLgSize,
    photoForSmSize,
    isButton,
    clickOrder,
}) => {
    const onOrderClick = () => {
        let targetElement = document.querySelector(".above-the-menu-line");
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    useEffect(() => {
        if (clickOrder === true) {
            setTimeout(
                () => document.getElementById("orderButton").click(),
                300
            );
        }
    }, [clickOrder]);
    return (
        <div className="img-container">
            <img
                src={photoForLgSize || "/images/pizzabg.jpg"}
                alt=""
                className="img-fluid d-none d-md-block w-100"
            />
            <img
                src={photoForSmSize || "/images/pizzabgsm.jpg"}
                alt=""
                className="img-fluid d-block d-sm-block d-md-none w-100"
            />
            {/* <div className="bottom-right-text">Bottom right</div> */}
            {isButton && (
                <div className="center-image-button">
                    <button
                        id="orderButton"
                        onClick={onOrderClick}
                        className="btn btn-outline-light btn-lg order-button"
                    >
                        Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default DisplayPhoto;
