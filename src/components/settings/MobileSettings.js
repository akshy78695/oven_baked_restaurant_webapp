import React from "react";
import SettingsNavbar from "./SettingsNavbar";
import {useState} from "react";
import {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const getWidth = () => {
	const {innerWidth: width} = window;
	return width;
};
const MobileSettings = ({location}) => {
	const [width, setWidth] = useState(getWidth);
	const {profile} = useSelector((state) => state.firebase && state.firebase);
	useEffect(() => {
		setWidth(window.innerWidth);
	}, []);
	if (width > 785) {
		return <Redirect to="/settings" />;
	}
	return (
		<div className="container" style={{marginTop: "70px"}}>
			<div className=" h3 text-center">Settings</div>

			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card borderForOrders">
						<div className="card-body px-0 px-md-3">
							<SettingsNavbar
								pathname={location.pathname}
								profile={profile}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileSettings;
