import React from "react";
import Intro from "./Intro";
import Menu from "./Menu";
import Footer from "./Footer";
import DisplayPhoto from "./DisplayPhoto";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./layoutStyle.css";
import { Link } from "react-router-dom";
const Home = () => {
    const dispatch = useDispatch();
    const { moveToMenu, isDeliveryPerson } = useSelector((state) => ({
        moveToMenu: state.helper.moveToMenu,
        isDeliveryPerson: state.firebase.profile.isDeliveryPerson,
    }));
    useEffect(() => {
        if (moveToMenu) {
            dispatch({ type: "SET_MOVE_TO_MENU", payload: false });
        }

        //eslint-disable-next-line
    }, []);
    return (
        <div>
            <DisplayPhoto isButton={true} clickOrder={moveToMenu} />
            <Intro />
            <hr className="mx-4 above-the-menu-line" />
            <Menu />
            <br />
            <br />
            <br />
            <Footer />
            {isDeliveryPerson && (
                <Link to="/orders_to_pickup">
                    {true && (
                        <div className="floating_button_intro h6">
                            <div>Orders</div>
                            <div>
                                <svg
                                    width="2em"
                                    height="2em"
                                    viewBox="0 0 16 16"
                                    className="bi bi-arrow-down-short"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                    <button className="floating_order_button text-decoration-none">
                        <svg
                            width="1.8em"
                            height="1.8em"
                            viewBox="0 0 16 16"
                            className="bi bi-receipt-cutoff mb-1"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v13h-1V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51L2 2.118V15H1V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zM0 15.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Home;
