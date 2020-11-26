import React from "react";

const Footer = () => {
    return (
        <div className="py-4" style={{ background: "rgb(0,0,0,0.3)" }}>
            <div className="h3 mb-0 text-center font-italic">follow us on</div>
            <div className="text-center h2 my-4">
                <span style={{ cursor: "pointer" }}>
                    <img
                        src="https://img.icons8.com/windows/48/000000/youtube-play.png"
                        alt=""
                    />
                </span>
                <span style={{ cursor: "pointer" }}>
                    <img
                        src="https://img.icons8.com/windows/48/000000/instagram-new.png"
                        alt=""
                    />
                </span>
                <span style={{ cursor: "pointer" }}>
                    <img
                        src="https://img.icons8.com/windows/48/000000/twitter.png"
                        alt=""
                    />
                </span>
                <span style={{ cursor: "pointer" }}>
                    <img
                        src="https://img.icons8.com/windows/48/000000/github.png"
                        alt=""
                    />
                </span>
            </div>
            <div className="text-secondary float-right">
                <span>All rights reserved. ©Oven_Baked_Ltd.</span>
                {/* <div className="">
                </div> */}
            </div>
        </div>
    );
};

export default Footer;
