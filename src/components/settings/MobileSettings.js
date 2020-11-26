import React from "react";
import SettingsNavbar from "./SettingsNavbar";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const getWidth = () => {
    const { innerWidth: width } = window;
    return width;
};
const MobileSettings = ({ location }) => {
    const [width, setWidth] = useState(getWidth);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);
    if (width > 785) {
        return <Redirect to="/settings" />;
    }
    return (
        <div className="container" style={{ marginTop: "70px" }}>
            <div className=" h3 text-center">Settings</div>

            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <SettingsNavbar pathname={location.pathname} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileSettings;
