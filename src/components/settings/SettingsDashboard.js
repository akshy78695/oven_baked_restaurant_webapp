import React, { useEffect, useState } from "react";
import SettingsNavbar from "./SettingsNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import BasicSettings from "./BasicSettings";
import { useDispatch, useSelector } from "react-redux";
import AddressSettings from "./AddressSettings";
import AccountSettings from "./AccountSettings";
import YourOrders from "./YourOrders";
import FavoriteOrders from "./FavoriteOrders";

const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
};
const SettingsDashboard = ({ location, history }) => {
    const { auth, profile } = useSelector(
        (state) => state.firebase && state.firebase
    );
    const userUid = useSelector((state) => state.firebase.auth.uid);
    const { isAdmin } = useSelector((state) => state.helper && state.helper);

    if (auth.isLoaded && auth.isEmpty) {
        return <Redirect to="/signin" />;
    }
    if (isAdmin) return <Redirect to="/admin/settings" />;
    // if (width < 785) {
    //     console.log("less then 785");
    // }
    return (
        <div style={{ marginTop: "60px" }}>
            <div className="ml-3 h3 text-center d-none d-md-block">
                Settings
            </div>
            <div className="mt-3 container">
                <div className="row">
                    <div className="col-md-4 d-none d-md-block">
                        {isAdmin !== null && (
                            <SettingsNavbar pathname={location.pathname} />
                        )}
                    </div>
                    <div className="col-md-8">
                        {auth.isLoaded && (
                            <Switch>
                                <Redirect
                                    exact
                                    from="/settings"
                                    to="/settings/basic"
                                />
                                <Route
                                    exact
                                    path="/settings/basic"
                                    render={() => <BasicSettings auth={auth} />}
                                ></Route>
                                <Route
                                    exact
                                    path="/settings/address"
                                    render={() => (
                                        <AddressSettings
                                            profile={profile}
                                            history={history}
                                        />
                                    )}
                                ></Route>
                                <Route
                                    exact
                                    path="/settings/account"
                                    render={() => (
                                        <AccountSettings
                                            history={history}
                                            auth={auth}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/settings/your_orders"
                                    render={() => (
                                        <YourOrders
                                            auth={auth}
                                            userUid={userUid}
                                            profile={profile}
                                            history={history}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/settings/favorite_orders"
                                    render={() => (
                                        <FavoriteOrders
                                            auth={auth}
                                            userUid={userUid}
                                            profile={profile}
                                            history={history}
                                        />
                                    )}
                                />
                            </Switch>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsDashboard;
