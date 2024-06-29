import React, { useState, useEffect } from "react";
import FooterPage from "../components/Footer/FooterPage";
import axios from "axios";
import Loading from "./shared/Loading";
import Error from "./shared/Error";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [menuToShow, setMenuToShow] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/menu/all`
        );
        setMenu(response?.data?.data);
        setMenuToShow(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

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

    fetchMenu();

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setMenuToShow(menu);
    } else {
      const filterResult = menu.filter(
        (data) => data.categoryName === selectedCategory
      );
      setMenuToShow(filterResult);
    }
  }, [selectedCategory, menu]);

  if (pageLoading) {
    return <Loading />;
  }

  if (!pageLoading && menu.length < 1) {
    return <Error message="No menu found" />;
  }

  return (
    <div className="min-h-screen container mx-auto pt-6 pb-12">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-4xl text-center ">Our Menu</h1>
        <p className="text-gray-500 text-sm px-12">
          We consider all the drivers of change gives you the components you
          need to change to create a truly happens.
        </p>
      </div>
      <div className="flex justify-center pt-5 gap-1 overflow-x-scroll text-sm">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 border rounded-full ${
            selectedCategory === "All"
              ? "bg-[#AD343E] text-white"
              : "bg-white text-[#AD343E]"
          } sm:w-1/2 md:w-auto lg:mx-4`}
        >
          All
        </button>
        {categories?.map((data) => {
          const { _id, categoryName } = data;
          return (
            <button
              key={_id}
              onClick={() => setSelectedCategory(categoryName)}
              className={`px-4 py-2 border rounded-full ${
                selectedCategory === categoryName
                  ? "bg-[#AD343E] text-white"
                  : "bg-white text-[#AD343E]"
              } sm:w-1/2 md:w-auto lg:mx-4`}
            >
              {categoryName}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 px-4">
        {menuToShow?.map((data) => {
          const { _id, foodName, price, categoryName, imageURL } = data;
          return (
            <div
              key={_id}
              className="border border-gray-300 rounded-2xl flex flex-col"
            >
              <div className="relative h-0" style={{ paddingTop: "133.33%" }}>
                <img
                  src={imageURL}
                  alt={foodName}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                />
              </div>
              <div className="px-4 py-4">
                <h2 className="text-xl font-bold">{foodName}</h2>
                <p className="text-sm -tracking-wider">{categoryName}</p>
                <p className="mt-2">
                  <span className="font-bold text-sm">Price:</span> bdt {price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {menuToShow.length < 1 && (
        <div className="text-center">
          <p>No {selectedCategory} food is available now</p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
