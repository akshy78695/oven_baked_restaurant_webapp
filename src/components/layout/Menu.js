import React from "react";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Menu = () => {
	return (
		<div>
			<div className="h3 text-danger text-center my-3">
				Oven-Baked's Menu
			</div>
			<div className="basic-grid">
				<div className="card custom-card border-success">
					<LazyLoadImage
						src={"/images/veg.jpg"}
						className="card-img-top"
						alt="menu-veg"
						effect="blur"
						width="100%"
					/>
					{/* <img
						// src="https://www.dominos.co.in/theme2/front/images/menu-images/my-vegpizza.jpg"
						src="/images/veg.jpg"
						className="card-img-top"
						alt=""
					/> */}
					<div className="card-body text-center text-secondary">
						<div className="h3">Veg Pizza</div>
						<div className="h5 font-weight-normal">
							A delight for veggie lovers! it's softer and tastier
						</div>
						<Link to="/pizza/veg">
							<button className="btn btn-outline-success btn-lg">
								View All
							</button>
						</Link>
					</div>
				</div>
				<div className="card custom-card border-danger">
					<LazyLoadImage
						src={"/images/Non Veg.jpg"}
						className="card-img-top"
						alt="menu-nonveg"
						effect="blur"
						width="100%"
					/>
					{/* <img
						// src="https://www.dominos.co.in/theme2/front/images/menu-images/my-nonveg.jpg"
						src="/images/Non Veg.jpg"
						className="card-img-top"
						alt=""
					/> */}
					<div className="card-body text-center text-secondary">
						<div className="h3">Non-Veg Pizza</div>
						<div className="h5 font-weight-normal">
							Get fresh non-veg pizza with fresh crusts & toppings
						</div>
						<Link to="/pizza/non_veg">
							<button className="btn btn-outline-danger btn-lg">
								View All
							</button>
						</Link>
					</div>
				</div>
				<div className="card custom-card border-warning">
					<LazyLoadImage
						src={"/images/pizzaMania.jpg"}
						className="card-img-top"
						alt="menu-pizzamania"
						effect="blur"
						width="100%"
					/>
					{/* <img
						// src="https://www.dominos.co.in/theme2/front/images/menu-images/my-pizzamania.png"
						src="/images/pizzaMania.jpg"
						className="card-img-top"
						alt=""
					/> */}
					<div className="card-body text-center text-secondary">
						<div className="h3">Pizza Mania</div>
						<div className="h5 font-weight-normal">
							Get fresh regular size pizza with fresh toppings and
							cheese, within your budget
						</div>
						<Link to="/pizza/mania">
							<button className="btn btn-outline-warning btn-lg">
								View All
							</button>
						</Link>
					</div>
				</div>
				<div className="card custom-card border-info">
					<LazyLoadImage
						src={"/images/sideBeverages.jpg"}
						className="card-img-top"
						alt="menu-sideBeverages"
						effect="blur"
						width="100%"
					/>
					{/* <img
						// src="https://www.dominos.co.in/theme2/front/images/menu-images/sides_beverages.jpg"
						src="/images/sideBeverages.jpg"
						className="card-img-top"
						alt=""
					/> */}
					<div className="card-body text-center text-secondary">
						<div className="h3">Side Beverages</div>
						<div className="h5 font-weight-normal">
							Complement your pizza with wide range of sides &
							beverages
						</div>
						<Link to="/pizza/side_beverages">
							<button className="btn btn-outline-info btn-lg">
								View All
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
