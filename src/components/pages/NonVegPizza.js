import React, { useEffect } from "react";
import DisplayPhoto from "../layout/DisplayPhoto";
import {  useFirestoreConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import PizzaToast from "../layout/PizzaToast";

const NonVegPizza = () => {
    const dispatch = useDispatch();
    useFirestoreConnect([
        {
            collection: "products",
            where: ["type", "==", "non-veg"],
            storeAs: "non_veg",
        },
    ]);
    const nonVegPizzas = useSelector(
        (state) => state.firestore.ordered && state.firestore.ordered.non_veg
    );
    // const onClick = async (e) => {
    //     for (let i = 0; i < nonVegPizzas.length; i++) {
    //         let obj = {};
    //         obj.name = nonVegPizzas[i].name;
    //         obj.description = nonVegPizzas[i].desc;
    //         obj.price = nonVegPizzas[i].price;
    //         obj.type = "non-veg";
    //         const storage = firebase.storage();
    //         const storageRef = storage.ref();
    //         const userUid = firebase.auth().currentUser.uid;
    //         const starRef = storageRef.child(
    //             `product_images/${nonVegPizzas[i].name}.jpg`
    //         );
    //         starRef
    //             .getDownloadURL()
    //             .then(async (url) => {
    //                 obj.imageURL = url;
    //                 console.log(obj);
    //                 await firestore.collection("products").add(obj);
    //             })
    //             .catch((e) => {
    //                 console.log(e);
    //                 console.log(obj.name);
    //             });
    //     }
    // };
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);
    return (
        <div>
            <DisplayPhoto
                photoForLgSize="/images/non-veg-lg-1280x521.jpg"
                photoForSmSize="/images/non-veg-sm-960x1055.jpg"
            />
            <div className="h2 text-center text-danger mt-5 mb-3">
                Non-Veg Pizza
            </div>
            {nonVegPizzas === undefined && (
                <div className="text-center mb-4">
                    <div
                        className="spinner-border text-danger"
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
            {/* using basic-grid-for-veg because its same with non veg */}
            <div className="basic-grid-for-veg">
                {nonVegPizzas &&
                    nonVegPizzas.length > 0 &&
                    nonVegPizzas.map((pizza) => (
                        <div
                            key={pizza.id}
                            className="card custom-card-for-veg border-danger"
                        >
                            <img
                                // src={`/images/non_veg/${pizza.name}.jpg`}
                                src={pizza.imageURL}
                                alt=""
                                className="card-img-top"
                            />
                            <div className="text-danger h6">{pizza.name}</div>
                            <div className="text-muted font-weight-light h6 mx-1">
                                {pizza.description}.
                            </div>
                            <div className="h6 text-secondary my-2">
                                {pizza.price.small && (
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
                            <div className="text-danger mt-2 mb-3">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() =>
                                        dispatch({
                                            type: "SHOW_TOAST",
                                            payload: pizza,
                                        })
                                    }
                                >
                                    Get this one
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <hr/>
            <PizzaToast />
        </div>
    );
};

export default NonVegPizza;
// const nonVegPizzas = [
//     {
//         sr: 1,
//         name: "PEPPER BARBECUE CHICKEN",
//         desc: `Pepper Barbecue Chicken I Cheese`,
//         price: {
//             small: "130",
//             medium: "300",
//             large: "550",
//         },
//     },
//     {
//         sr: 2,
//         name: "CHICKEN SAUSAGE",
//         price: {
//             small: "130",
//             medium: "300",
//             large: "550",
//         },
//         desc: `Chicken Sausage I Cheese`,
//     },
//     {
//         sr: 3,
//         name: "Chicken Golden Delight",
//         price: {
//             small: "180",
//             medium: "400",
//             large: "650",
//         },
//         desc: `Mmm! Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!`,
//     },
//     {
//         sr: 4,
//         name: "Non Veg Supreme",
//         price: {
//             small: "170",
//             medium: "380",
//             large: "600",
//         },
//         desc: `Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers`,
//     },
//     {
//         sr: 5,
//         name: "Chicken Dominator",
//         price: {
//             small: "180",
//             medium: "400",
//             large: "620",
//         },
//         desc: `Treat your taste buds with Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers`,
//     },
//     {
//         sr: 6,
//         name: "PEPPER BARBECUE & ONION",
//         price: {
//             small: "140",
//             medium: "380",
//             large: "520",
//         },
//         desc: `Pepper Barbecue Chicken I Onion`,
//     },
//     {
//         sr: 7,
//         name: "CHICKEN FIESTA",
//         price: {
//             small: "130",
//             medium: "350",
//             large: "500",
//         },
//         desc: `Grilled Chicken Rashers I Peri-Peri Chicken I Onion I Capsicum`,
//     },
//     {
//         sr: 8,
//         name: "Indi Chicken Tikka",
//         price: {
//             small: "170",
//             medium: "400",
//             large: "550",
//         },
//         desc:
//             "The wholesome flavour of tandoori masala with Chicken tikka I onion I red paprika I mint mayo",
//     },
// ];
