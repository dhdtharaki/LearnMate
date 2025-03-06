import React from "react";
import Error from "../assets/404.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  const NotFound = Error;
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div>
        <img
          src={NotFound}
          alt="404 Error"
          className="w-[400px] h-[400px] ml-auto mr-auto"
        />
      </div>
      <div className="text-center text-8xl mb-16">Whoops!</div>
      <div className="text-center text-3xl mb-5 ">
        The Page Your are lookings is not exists.
      </div>
      <div className="text-center text-xl mb-16 text-gray-500">
        Go Back to{" "}
        <Link to={"/"}>
          <span className="text-blue-500">Home Page </span>
        </Link>
        or <span className="text-blue-500">Contact Us</span> about the problem
      </div>
    </div>
  );
};

export default NotFound;
