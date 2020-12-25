import React from "react";
import DisplayPhoto from "../layout/DisplayPhoto";
import "./pagesStyle.css";
import { useEffect } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import PizzaToast from "../layout/PizzaToast";

const VegPizza = () => {
    const dispatch = useDispatch();
    useFirestoreConnect([
        {
            collection: "products",
            where: ["type", "==", "veg"],
            storeAs: "veg",
        },
    ]);
    const { vegPizzas } = useSelector((state) => ({
        vegPizzas: state.firestore.ordered && state.firestore.ordered.veg,
    }));
    const { isAdmin, pizzaAdded } = useSelector((state) => ({
        isAdmin: state.helper.isAdmin && state.helper.isAdmin,
        pizzaAdded: state.helper.pizzaAdded,
    }));
    useEffect(() => {
        if (pizzaAdded) {
            //show toast
            let x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = "Added to your cart.";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 1700);
            dispatch({ type: "SET_PIZZA_ADDED", payload: false });
        }
        //eslint-disable-next-line
    }, [pizzaAdded]);
    useEffect(() => window.scrollTo({ top: 0 }), []);
    return (
        <div>
            <DisplayPhoto
                photoForLgSize={"/images/veg-lg-1280x521.jpg"}
                photoForSmSize={"/images/veg-sm-960x1055.jpg"}
                isButton={false}
            />
            <div className="h2 text-success text-center mt-5 mb-3">
                Veg Pizza
            </div>
            {vegPizzas === undefined && (
                <div className="text-center mb-4">
                    <div
                        className="spinner-border text-success"
                        style={{
                            marginTop: "40px",
                            width: "2.5rem",
                            height: "2.5rem",
                        }}
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div className="basic-grid-for-veg">
                {vegPizzas &&
                    vegPizzas.map((pizza) => (
                        <div
                            key={pizza.id}
                            className="card custom-card-for-veg border-success"
                        >
                            <img
                                // src={`/images/veg/${pizza.name}.jpg`}
                                src={pizza.imageURL}
                                alt=""
                                className="card-img-top"
                            />
                            <div className="text-success h6">{pizza.name}</div>
                            <div className="text-muted font-weight-light h6 mx-1">
                                {pizza.description}.
                            </div>
                            <div className="h6 text-secondary mt-2 mb-3">
                                {pizza.price.small &&
                                    pizza.price.small !== undefined && (
                                        <span className="text-success  ">
                                            ₹{pizza.price.small}/
                                        </span>
                                    )}
                                {pizza.price.medium && (
                                    <span className="text-primary">
                                        ₹{pizza.price.medium}/
                                    </span>
                                )}
                                {pizza.price.large && (
                                    <span className="text-danger">
                                        ₹{pizza.price.large}
                                    </span>
                                )}
                            </div>
                            {!isAdmin && (
                                <div className="text-danger my-2">
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => {
                                            dispatch({
                                                type: "SHOW_TOAST",
                                                payload: pizza,
                                            });
                                        }}
                                    >
                                        Get this one
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <hr />
            <PizzaToast />
            {/* //toast */}
            <div
                id="snackbar"
                style={{ backgroundColor: "rgb(88, 139, 64)" }}
            ></div>
        </div>
    );
};

export default VegPizza;
// const vegPizzas = [
//     {
//         sr: 1,
//         name: "Margherita",
//         price: {
//             small: "130",
//             medium: "350",
//             large: "550",
//         },
//         desc: `A hugely popular margherita, with a deliciously tangy single cheese topping`,
//     },
//     {
//         sr: 2,
//         name: "Double Cheese Margherita",
//         price: {
//             small: "130",
//             medium: "350",
//             large: "550",
//         },
//         desc: `The ever-popular Margherita - loaded with extra cheese... oodies of it!`,
//     },
//     {
//         sr: 3,
//         name: "Farm House",
//         price: {
//             small: "150",
//             medium: "400",
//             large: "590",
//         },
//         desc: `Check out this mouth watering overload of crunchy, crisp capsicum, succulent mushrooms and fresh tomatoes`,
//     },
//     {
//         sr: 4,
//         name: "Peppy Paneer",
//         price: {
//             small: "130",
//             medium: "350",
//             large: "540",
//         },
//         desc: `Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!`,
//     },
//     {
//         sr: 5,
//         name: "Mexican Green Wave",
//         price: {
//             small: "160",
//             medium: "380",
//             large: "640",
//         },
//         desc: `A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs.`,
//     },
//     {
//         sr: 6,
//         name: "Deluxe Veggie",
//         price: {
//             small: "160",
//             medium: "360",
//             large: "640",
//         },
//         desc: `For a vegetarian looking for a BIG treat that goes easy on the spices, this one's got it all.`,
//     },
//     {
//         sr: 7,
//         name: "Veg Extravaganza",
//         price: {
//             small: "180",
//             medium: "380",
//             large: "670",
//         },
//         desc: `Overload of golden corn, exotic black olives, crunchy onions, crisp capsicum, succulent mushrooms, juicyfresh tomatoes and jalapeno.`,
//     },
//     {
//         sr: 8,
//         name: "CHEESE N CORN",
//         price: {
//             small: "150",
//             medium: "320",
//             large: "570",
//         },
//         desc: `Cheese I Golden Corn`,
//     },
//     {
//         sr: 9,
//         name: "PANEER MAKHANI",
//         price: {
//             small: "150",
//             medium: "320",
//             large: "570",
//         },
//         desc: `Paneer and Capsicum on Makhani Sauce`,
//     },
//     {
//         sr: 10,
//         name: "VEGGIE PARADISE",
//         price: {
//             small: "150",
//             medium: "320",
//             large: "570",
//         },
//         desc: `Goldern Corn, Black Olives, Capsicum & Red Paprika`,
//     },
//     {
//         sr: 11,
//         name: "FRESH VEGGIE",
//         price: {
//             small: "120",
//             medium: "300",
//             large: "520",
//         },
//         desc: `Onion I Capsicum`,
//     },
//     {
//         sr: 12,
//         name: "Indi Tandoori Paneer",
//         price: {
//             medium: "340",
//             large: "580",
//         },
//         desc: `It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum I red paprika I mint mayo`,
//     },
// ];
