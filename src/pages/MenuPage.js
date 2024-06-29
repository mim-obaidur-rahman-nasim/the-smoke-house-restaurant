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
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center pt-8 px-10">
        <div>
          <h1 className="font-medium text-[100px] text-center">Our Menu</h1>
          <p>
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </p>
        </div>
        <div className="flex flex-wrap justify-center pt-5 gap-4">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === "All"
                ? "bg-[#AD343E] text-white"
                : "bg-white text-[#AD343E]"
            }  sm:w-1/2 md:w-auto lg:mx-4`}
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
                }  sm:w-1/2 md:w-auto lg:mx-4`}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center pt-10 pb-10">
          {menuToShow?.map((data) => {
            const { _id, foodName, price, categoryName, imageURL } = data;
            return (
              <div
                key={_id}
                style={{ margin: "20px" }}
                className="w-1/2 md:w-1/3 xl:w-1/4 p-4 border text-center"
              >
                <img
                  src={imageURL}
                  alt={foodName}
                  className="w-full h-auto mb-4"
                />
                <h2 className="text-lg">{foodName}</h2>
                <p>Category: {categoryName}</p>
                <p>Price: bdt {price}</p>
              </div>
            );
          })}

          {menuToShow.length < 1 && (
            <p>No {selectedCategory} food is available now</p>
          )}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default MenuPage;
