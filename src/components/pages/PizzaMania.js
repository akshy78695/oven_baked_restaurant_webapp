import React, { useEffect } from "react";
import DisplayPhoto from "../layout/DisplayPhoto";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import PizzaToast from "../layout/PizzaToast";

const PizzaMania = () => {
    const dispatch = useDispatch();
    useFirestoreConnect([
        {
            collection: "products",
            where: ["type", "==", "mania"],
            storeAs: "mania",
        },
    ]);
    const maniaPizzas = useSelector(
        (state) => state.firestore.ordered && state.firestore.ordered.mania
    );

    // const onClick = async (e) => {
    //     for (let i = 0; i < maniaPizzas.length; i++) {
    //         let obj = {};
    //         obj.name = maniaPizzas[i].name;
    //         obj.description = maniaPizzas[i].desc;
    //         obj.price = maniaPizzas[i].price;
    //         obj.isVeg = maniaPizzas[i].isVeg;
    //         obj.type = "mania";
    //         const storage = firebase.storage();
    //         const storageRef = storage.ref();
    //         const userUid = firebase.auth().currentUser.uid;
    //         const starRef = storageRef.child(
    //             `product_images/${maniaPizzas[i].name}.jpg`
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
                photoForLgSize="/images/mania-lg-1280x521.jpg"
                photoForSmSize="/images/mania-sm-960x1055.jpg"
            />
            <div className="h2 text-center mt-5 mb-3 text-warning">
                Pizza mania
            </div>
            {maniaPizzas === undefined && (
                <div className="text-center mb-4">
                    <div
                        className="spinner-border text-warning"
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
            {maniaPizzas !== undefined && (
                <ul
                    className="nav nav-tabs ml-2 mb-3"
                    id="myTab"
                    role="tablist"
                >
                    <li className="nav-item">
                        <a
                            className="nav-link font-weight-normal active text-success"
                            id="veg-tab"
                            data-toggle="tab"
                            href="#veg"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                        >
                            <div className="d-flex align-items-center">
                                Veg
                                <span className="ml-2">
                                    <img
                                        src="https://img.icons8.com/color/20/000000/vegetarian-food-symbol.png"
                                        alt=""
                                    />
                                </span>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link font-weight-normal text-danger"
                            id="non-veg-tab"
                            data-toggle="tab"
                            href="#non-veg"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                        >
                            <div className="d-flex align-items-center">
                                Non-Veg
                                <span className="ml-2">
                                    <img
                                        src="https://img.icons8.com/color/20/000000/non-vegetarian-food-symbol.png"
                                        alt=""
                                    />
                                </span>
                            </div>
                        </a>
                    </li>
                </ul>
            )}
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="veg"
                    role="tabpanel"
                    aria-labelledby="veg-tab"
                >
                    <div className="basic-grid-for-veg">
                        {maniaPizzas &&
                            maniaPizzas.map(
                                (pizza) =>
                                    pizza.isVeg && (
                                        <div
                                            key={pizza.id}
                                            className="card custom-card-for-veg border-success"
                                        >
                                            <img
                                                src={pizza.imageURL}
                                                // src={`/images/pizza_mania/${pizza.name}.jpg`}
                                                alt=""
                                                className="card-img-top"
                                            />
                                            <div className="text-danger h6">
                                                {pizza.name}
                                            </div>
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
                                            <div className="text-success mt-2 mb-3">
                                                <button
                                                    className="btn btn-outline-success"
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
                                    )
                            )}
                    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="non-veg"
                    role="tabpanel"
                    aria-labelledby="non-veg-tab"
                >
                    <div className="basic-grid-for-veg">
                        {maniaPizzas &&
                            maniaPizzas.map(
                                (pizza) =>
                                    !pizza.isVeg && (
                                        <div
                                            key={pizza.id}
                                            className="card custom-card-for-veg border-success"
                                        >
                                            <img
                                                // src={`/images/pizza_mania/${pizza.name}.jpg`}
                                                src={pizza.imageURL}
                                                alt=""
                                                className="card-img-top"
                                            />
                                            <div className="text-danger h6">
                                                {pizza.name}
                                            </div>
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
                                    )
                            )}
                    </div>
                    <hr />
                </div>
            </div>
            <hr/>
            <PizzaToast />
        </div>
    );
};

export default PizzaMania;
// const maniaPizzas = [
//     {
//         sr: 1,
//         name: "TOMATO",
//         desc: `Juicy tomato in a flavourful combination with cheese I tangy sauce`,
//         price: {
//             small: "130",
//             medium: "300",
//             large: "420",
//         },
//         isVeg: true,
//     },
//     {
//         sr: 2,
//         name: "VEG LOADED",
//         price: {
//             small: "130",
//             medium: "280",
//             large: "400",
//         },
//         desc: `Tomato | Grilled Mushroom |Jalapeno |Golden Corn | Beans in a fresh pan crust`,
//         isVeg: true,
//     },
//     {
//         sr: 3,
//         name: "CHEESY",
//         desc: `Orange Cheddar Cheese I Mozzarella`,
//         price: {
//             small: "150",
//             medium: "280",
//             large: "400",
//         },
//         isVeg: true,
//     },
//     {
//         sr: 4,
//         name: "CAPSICUM",
//         price: {
//             small: "130",
//             medium: "250",
//             large: "360",
//         },
//         desc: "CAPSICUM",
//         isVeg: true,
//     },
//     {
//         sr: 5,
//         name: "ONION",
//         price: {
//             small: "130",
//             medium: "250",
//             large: "360",
//         },
//         desc: "onion",
//         isVeg: true,
//     },
//     {
//         sr: 6,
//         name: "GOLDEN CORN",
//         price: {
//             small: "150",
//             medium: "280",
//             large: "400",
//         },
//         desc: "Golden corn",
//         isVeg: true,
//     },
//     {
//         sr: 7,
//         name: "PANNER AND ONION",
//         price: {
//             small: "160",
//             medium: "300",
//             large: "450",
//         },
//         desc: "Creamy Panner and Onion",
//         isVeg: true,
//     },
//     {
//         sr: 8,
//         name: "CHEESE AND TOMATO",
//         price: {
//             small: "150",
//             medium: "300",
//             large: "450",
//         },
//         desc: "A delectable combination of cheese and juicy tomato",
//         isVeg: true,
//     },
//     {
//         sr: 9,
//         name: "NON VEG LOADED",
//         price: {
//             small: "180",
//             medium: "340",
//             large: "550",
//         },
//         desc: `Peri - Peri chicken | Pepper Barbecue | Chicken Sausage in a fresh pan crust`,
//         isVeg: false,
//     },
//     {
//         sr: 10,
//         name: "CHICKEN SAUSAGE",
//         price: {
//             small: "160",
//             medium: "320",
//             large: "500",
//         },
//         desc: "Chicken Sausage I Cheese",
//         isVeg: false,
//     },
//     {
//         sr: 11,
//         name: "PEPPER BARBECUE CHICKEN",
//         price: {
//             small: "170",
//             medium: "340",
//             large: "520",
//         },
//         desc: "Pepper Barbecue Chicken",
//         isVeg: false,
//     },
// ];
