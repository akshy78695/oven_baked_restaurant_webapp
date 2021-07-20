import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import VegPizza from "./components/pages/VegPizza";
import NonVegPizza from "./components/pages/NonVegPizza";
import PizzaMania from "./components/pages/PizzaMania";
import SideBeverages from "./components/pages/SideBeverages";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Cart from "./components/pages/Cart";
import UserInfoPage from "./components/pages/UserInfoPage";
import YourOrder from "./components/pages/YourOrder";
import PaymentOption from "./components/pages/PaymentOption";
import SettingsDashboard from "./components/settings/SettingsDashboard";
import MobileSettings from "./components/settings/MobileSettings";
import ChangePassword from "./components/settings/ChangePassword";
import Order from "./components/order/Order";
import Orders from "./components/admin/Orders";
import AddDeliveryPerson from "./components/admin/settings/AddDeliveryPerson";
import DeliveryPersons from "./components/admin/settings/DeliveryPersons";
import AdminSettings from "./components/admin/settings/AdminSettings";
import OrdersToPickup from "./components/delivery/OrdersToPickup";
import OrdersHistory from "./components/admin/OrdersHistory";

function App() {
	return (
		<Router>
			<div className="App">
				{/* <h2>Navbar</h2> */}
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/menu" component={Home} />
					<Route exact path="/pizza/veg" component={VegPizza} />
					<Route
						exact
						path="/pizza/non_veg"
						component={NonVegPizza}
					/>
					<Route exact path="/pizza/mania" component={PizzaMania} />
					<Route
						exact
						path="/pizza/side_beverages"
						component={SideBeverages}
					/>
					<Route exact path="/signin" component={SignIn} />
					<Route
						exact
						path="/delivery_info"
						component={UserInfoPage}
					/>
					<Route
						exact
						path="/order_confirmation"
						component={YourOrder}
					/>
					<Route
						exact
						path="/payment_option"
						component={PaymentOption}
					/>
					<Route exact path="/order" component={Order} />
					<Route exact path="/orders" component={Orders} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/cart" component={Cart} />
					<Route path="/settings" component={SettingsDashboard} />
					<Route
						exact
						path="/account/change_password/token/:id"
						component={ChangePassword}
					/>
					<Route path="/_settings" component={MobileSettings} />
					<Route path="/admin/settings" component={AdminSettings} />
					<Route
						exact
						path="/delivery_person"
						component={DeliveryPersons}
					/>
					<Route
						exact
						path="/delivery_person/add"
						component={AddDeliveryPerson}
					/>
					<Route
						exact
						path="/orders_to_pickup"
						component={OrdersToPickup}
					/>
					<Route
						exact
						path="/orders_history"
						component={OrdersHistory}
					/>

					<Route component={Home} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
