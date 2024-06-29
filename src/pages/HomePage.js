/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import section from "../assets/images/bg.svg";
import content from "../assets/images/Content(1).svg";
import Loading from "./shared/Loading";
import Error from "./shared/Error";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/category/all`
        );
        setCategories(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  if (!pageLoading && categories.length < 1) {
    return <Error message="No menu found" />;
  }

  if (pageError) {
    return <Error message={pageError} />;
  }
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${section})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="h-screen flex flex-col justify-center items-center w-full text-black  px-3 md:px-16 lg:px-32 py-32">
          <h1 className=" font-bold text-5xl lg:text-6xl text-center">
            Best food for
            <br /> your taste
          </h1>
          <p className=" font-normal text-md text-center pt-8">
            Discover delectable cuisine and unforgettable moments in our
            welcoming, culinary haven.
          </p>
          <div className=" flex gap-4 pt-10 text-sm">
            <Link
              to="book-now"
              className="text-white font-bold bg-[#AD343E] p-2 lg:p-4 rounded-full"
            >
              Book a Table
            </Link>
            <Link
              to="menu"
              className="font-bold p-2 lg:p-4 rounded-full border border-black"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col justify-center items-center py-10 sm:py-10 md:py-20 lg:py-30">
        <h1 className="font-bold text-4xl text-center"> Browse Our Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-8 px-4 gap-4">
          {categories?.map((category) => {
            const { _id, categoryName, description, icon } = category;
            return (
              <div key={_id} className="border border-[#AD343E] rounded-xl p-4">
                <img
                  src={icon}
                  alt={categoryName}
                  className="sm:w-1/3 object-cover rounded-t-2xl"
                />
                <h2 className="text-lg font-bold pt-5 pb-3 md:pt-10 md:pb-5">
                  {categoryName}
                </h2>
                <p className="text-sm md:text-base mb-4">{description}</p>
                <Link
                  to="menu"
                  className="text-[#AD343E] font-bold cursor-pointer"
                >
                  Explore Menu
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center p-2">
        <img src={content}></img>
      </div>
    </div>
  );
}

export default HomePage;
