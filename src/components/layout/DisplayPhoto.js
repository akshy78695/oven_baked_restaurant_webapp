import React from "react";
import {useEffect} from "react";
import "./layoutStyle.css";
const DisplayPhoto = ({
	photoForLgSize,
	photoForSmSize,
	isButton,
	clickOrder,
}) => {
	const onOrderClick = () => {
		let targetElement = document.querySelector(".above-the-menu-line");
		targetElement.scrollIntoView({behavior: "smooth", block: "start"});
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
			{/* <LazyLoadImage
				src={photoForLgSize || "/images/pizzabg.jpg"}
				alt="Display Image"
				className="img-fluid d-none d-md-block"
				width="100%"
				height="auto"
				effect="opacity"
			/> */}
			<img
				src={photoForLgSize || "/images/pizzabg.jpg"}
				alt="display-lg"
				className="img-fluid d-none d-md-block"
				width="100%"
				height="auto"
			/>
			<img
				src={photoForSmSize || "/images/pizzabgsm.jpg"}
				alt="display-sm"
				className="img-fluid d-block d-sm-block d-md-none"
				width="100%"
				height="auto"
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
