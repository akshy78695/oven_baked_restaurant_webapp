import React from "react";

const Intro = () => {
    return (
        <div className="text-center">
            <div className="h3 mt-5 mb-3">Welcome to Oven-Baked</div>
            <div className="h6 my-3 font-weight-normal mx-2">
                {" "}
                Choose from our wide range of delicious <span className="text-success">vegetarian</span> and
                <span className="text-danger"> non-vegetarian</span> pizzas, it's softer and tastier. Perfect answer
                to all your food cravings
            </div>
        </div>
    );
};

export default Intro;
