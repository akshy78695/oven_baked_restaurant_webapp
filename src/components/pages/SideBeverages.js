import React, { useEffect } from "react";
import DisplayPhoto from "../layout/DisplayPhoto";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import PizzaToast from "../layout/PizzaToast";

const SideBeverages = () => {
    const dispatch = useDispatch();
    useFirestoreConnect([
        {
            collection: "products",
            where: ["type", "==", "side-beverages"],
            storeAs: "side_beverages",
        },
    ]);
    const sideBeverages = useSelector(
        (state) =>
            state.firestore.ordered.side_beverages &&
            state.firestore.ordered.side_beverages
    );
    // const onClick = async (e) => {
    //     let obj = {};
    //     obj.name = sideBeverages[15].name;
    //     obj.description = sideBeverages[15].desc || "";
    //     obj.price = sideBeverages[15].price;
    //     obj.type = "side-beverages";
    //     obj.isVeg = sideBeverages[15].isVeg;
    //     const storage = firebase.storage();
    //     const storageRef = storage.ref();
    //     const starRef = storageRef.child(
    //         `product_images/${sideBeverages[15].name}.jpg`
    //     );
    //     starRef
    //         .getDownloadURL()
    //         .then(async (url) => {
    //             obj.imageURL = url;
    //             console.log(obj);
    //             await firestore.collection("products").add(obj);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //             console.log(obj.name);
    //         });
    // };

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);
    return (
        <div>
            <DisplayPhoto
                photoForLgSize="/images/side-bavarages-lg-1280x521.jpg"
                photoForSmSize="/images/side-beverages-sm-960x1055.jpg"
            />
            <div className="h2 text-center mt-5 mb-3 text-info">
                Side Beverages
            </div>
            {/* <button onClick={onClick}>Click</button> */}
            {sideBeverages === undefined && (
                <div className="text-center mb-4">
                    <div
                        className="spinner-border text-info"
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
            {sideBeverages !== undefined && (
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
                        {sideBeverages &&
                            sideBeverages.map(
                                (food) =>
                                    food.isVeg && (
                                        <div
                                            key={food.id}
                                            className="card custom-card-for-veg border-success"
                                        >
                                            <img
                                                // src={`/images/side_orders/${food.name}.jpg`}
                                                src={food.imageURL}
                                                alt=""
                                                className="card-img-top"
                                            />
                                            <div className="text-danger h6">
                                                {food.name}
                                            </div>
                                            {food.description && (
                                                <div className="text-muted font-weight-light h6 mx-1">
                                                    {food.description}.
                                                </div>
                                            )}
                                            <div className="h6 text-secondary my-2">
                                                {food.price.small && (
                                                    <span className="text-success  ">
                                                        ₹{food.price.small}/
                                                    </span>
                                                )}
                                                {food.price.medium && (
                                                    <span className="text-primary">
                                                        ₹{food.price.medium}/
                                                    </span>
                                                )}
                                                {food.price.large && (
                                                    <span className="text-danger">
                                                        ₹{food.price.large}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-success mt-2 mb-3">
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "SHOW_TOAST",
                                                            payload: food,
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
                        {sideBeverages &&
                            sideBeverages.map(
                                (food) =>
                                    !food.isVeg && (
                                        <div
                                            key={food.id}
                                            className="card custom-card-for-veg border-success"
                                        >
                                            <img
                                                // src={
                                                //     `/images/side_orders/${food.name}.jpg` ||
                                                //     `/images/side_orders/${food.name}.png`
                                                // }
                                                src={food.imageURL}
                                                alt=""
                                                className="card-img-top"
                                            />
                                            <div className="text-danger h6">
                                                {food.name}
                                            </div>
                                            {food.description && (
                                                <div className="text-muted font-weight-light h6 mx-1">
                                                    {food.description}.
                                                </div>
                                            )}
                                            <div className="h6 text-secondary my-2">
                                                {food.price.small && (
                                                    <span className="text-success  ">
                                                        ₹{food.price.small}/
                                                    </span>
                                                )}
                                                {food.price.medium && (
                                                    <span className="text-primary">
                                                        ₹{food.price.medium}/
                                                    </span>
                                                )}
                                                {food.price.large && (
                                                    <span className="text-danger">
                                                        ₹{food.price.large}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-danger mt-2 mb-3">
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "SHOW_TOAST",
                                                            payload: food,
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
            </div>
            <hr />
            <PizzaToast />
        </div>
    );
};

export default SideBeverages;
// const sideBeverages = [
//     {
//         sr: 1,
//         name: "Garlic Breadsticks",
//         price: {
//             small: "160",
//         },
//         desc: `The endearing tang of garlic in breadstics baked to perfection.`,
//         isVeg: true,
//     },
//     {
//         sr: 2,
//         name: "Stuffed Garlic Bread",
//         price: {
//             small: "250",
//         },
//         desc: `Freshly Baked Garlic Bread stuffed with mozzarella cheese, sweet corns & tangy and spicy jalapeños`,
//         isVeg: true,
//     },
//     {
//         sr: 3,
//         name: "Veg Pasta Italiano White",
//         price: {
//             small: "200",
//         },
//         desc:
//             "Penne Pasta tossed with extra virgin olive oil, exotic herbs & a generous helping of new flavoured sauce.",
//         isVeg: true,
//     },
//     {
//         sr: 4,
//         name: "Non Veg Pasta Italiano White",
//         price: {
//             small: "270",
//         },
//         desc:
//             "Penne Pasta tossed with extra virgin olive oil, exotic herbs & a generous helping of new flavoured sauce.",
//         isVeg: false,
//     },
//     {
//         sr: 5,
//         name: "Cheese Jalapeno Dip",
//         price: {
//             small: "80",
//         },
//         desc: "A soft creamy cheese dip spiced with jalapeno.",
//         isVeg: true,
//     },
//     {
//         sr: 6,
//         name: "Cheese Dip",
//         price: {
//             small: "70",
//         },
//         desc:
//             "A dreamy creamy cheese dip to add that extra tang to your snack.",
//         isVeg: true,
//     },
//     {
//         sr: 7,
//         name: "Lava Cake",
//         price: {
//             small: "65",
//         },
//         desc: "Filled with delecious molten chocolate inside.",
//         isVeg: true,
//     },
//     {
//         sr: 8,
//         name: "Butterscotch Mousse Cake",
//         price: {
//             small: "65",
//         },
//         desc:
//             "A Creamy & Chocolaty indulgence with layers of rich, fluffy Butterscotch Cream and delicious Dark Chocolate Cake",
//         isVeg: true,
//     },
//     {
//         sr: 9,
//         name: "Potato Cheese Shots",
//         price: {
//             small: "95",
//         },
//         desc:
//             "Crisp and golden outside,flavorful burst of cheese, potato & spice inside",
//         isVeg: true,
//     },
//     {
//         sr: 10,
//         name: "Crunchy Strips",
//         price: {
//             small: "125",
//         },
//         desc:
//             "Oven baked wheat thin crips with peri peri seasoning with a cheesy dip",
//         isVeg: true,
//     },
//     {
//         sr: 11,
//         name: "Taco Mexicana-Veg(Single)",
//         price: {
//             small: "150",
//         },
//         desc:
//             "Truly irresistible! Crispy taco with a decicious veg patty & creamy sauce",
//         isVeg: true,
//     },
//     {
//         sr: 12,
//         name: "CRINKLE FRIES",
//         price: {
//             small: "130",
//         },
//         desc:
//             "Crispy wavy masala coated fries served with a spicy tomato chilli sauce",
//         isVeg: true,
//     },
//     {
//         sr: 13,
//         name: "Taco Mexicana Veg",
//         price: {
//             small: "150",
//         },
//         desc:
//             "A crispy flaky wrap filled with Mexican Arancini Bean Patty rolled over a creamy Harissa Sauce",
//         isVeg: true,
//     },
//     {
//         sr: 14,
//         name: "Taco Mexicana Non Veg",
//         price: {
//             small: "180",
//         },
//         desc:
//             "A crispy flaky wrap filled with Hot and Smoky Chicken Patty rolled over a creamy Harissa Sauce.",
//         isVeg: false,
//     },
//     {
//         sr: 15,
//         name: "Veg Parcel",
//         price: {
//             small: "80",
//         },
//         isVeg: true,
//     },
//     {
//         sr: 16,
//         name: "Chicken Parcel",
//         price: {
//             small: "60",
//         },
//         isVeg: false,
//     },
//     {
//         sr: 17,
//         name: "BROWNIE FANTASY",
//         price: {
//             small: "100",
//         },
//         desc:
//             "Sweet Temptation! Hot Chocolate Brownie drizzled with chocolate fudge sauce",
//         isVeg: true,
//     },
// ];
