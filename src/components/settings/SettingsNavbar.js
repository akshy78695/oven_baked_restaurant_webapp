import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RightChevron from "../svg's/RightChevron";

const SettingsNavbar = ({ pathname }) => {
    const { isAdmin } = useSelector((state) => state.helper && state.helper);
    return (
        <div>
            <div className="list-group">
                <Link
                    to="/settings/basic"
                    className="list-group-item text-decoration-none d-flex align-items-center justify-content-between"
                >
                    Basic
                    {(pathname === "/settings/basic" ||
                        pathname === "/_settings" ||
                        pathname === "/_settings/") && (
                        <span>
                            <RightChevron />
                        </span>
                    )}
                </Link>
                <Link
                    to="/settings/your_orders"
                    className="list-group-item text-decoration-none d-flex align-items-center justify-content-between"
                >
                    Your orders
                    {(pathname === "/settings/your_orders" ||
                        pathname === "/_settings" ||
                        pathname === "/_settings/") && (
                        <span>
                            <RightChevron />
                        </span>
                    )}
                </Link>
                <Link
                    to="/settings/favorite_orders"
                    className="list-group-item text-decoration-none d-flex align-items-center justify-content-between"
                >
                    Favorite orders
                    {(pathname === "/settings/favorite_orders" ||
                        pathname === "/_settings" ||
                        pathname === "/_settings/") && (
                        <span>
                            <RightChevron />
                        </span>
                    )}
                </Link>
                <Link
                    to="/settings/address"
                    className="list-group-item text-decoration-none d-flex align-items-center justify-content-between"
                >
                    Address Book
                    {(pathname === "/settings/address" ||
                        pathname === "/_settings" ||
                        pathname === "/_settings/") && (
                        <span>
                            <RightChevron />
                        </span>
                    )}
                </Link>
                <Link
                    to="/settings/account"
                    className="list-group-item text-decoration-none d-flex align-items-center justify-content-between"
                >
                    Account
                    {(pathname === "/settings/account" ||
                        pathname === "/_settings" ||
                        pathname === "/_settings/") && (
                        <span>
                            <RightChevron />
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default SettingsNavbar;
