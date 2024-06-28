import React, { useState, useEffect } from "react";
import FooterPage from "../components/Footer/FooterPage";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Pancakes",
        category: "Breakfast",
        price: 9.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 2,
        name: "Burger",
        category: "Main Dishes",
        price: 12.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 3,
        name: "Coke",
        category: "Drinks",
        price: 2.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 4,
        name: "Cheesecake",
        category: "Desserts",
        price: 6.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 5,
        name: "Coffee",
        category: "Drinks",
        price: 3.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 6,
        name: "Scrambled Eggs",
        category: "Breakfast",
        price: 8.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 7,
        name: "Salad",
        category: "Main Dishes",
        price: 11.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
      {
        id: 8,
        name: "Ice Cream",
        category: "Desserts",
        price: 5.99,
        image:
          "https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE.jpg",
      },
    ];

    setMenuItems(mockData);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

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
        <div className="flex gap-4 pt-5">
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === "All"
                ? "bg-[#AD343E] text-white"
                : "bg-white text-[#AD343E]"
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === "Breakfast"
                ? "bg-[#AD343E] text-white"
                : "bg-white text-[#AD343E]"
            }`}
            onClick={() => handleCategoryClick("Breakfast")}
          >
            Breakfast
          </button>
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === "Main Dishes"
                ? "bg-[#AD343E] text-white"
                : "bg-white text-[#AD343E]"
            }`}
            onClick={() => handleCategoryClick("Main Dishes")}
          >
            Main Dishes
          </button>
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === "Drinks"
                ? "bg-[#AD343E] text-white"
                : "bg-white text-[#AD343E]"
            }`}
            onClick={() => handleCategoryClick("Drinks")}
          >
            Drinks
          </button>
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === "Desserts"
                ? "bg-[#AD343E] text-white"
                : "bg-white text-[#AD343E]"
            }`}
            onClick={() => handleCategoryClick("Desserts")}
          >
            Desserts
          </button>
        </div>
        <div className="flex flex-wrap justify-center pt-10 pb-10">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              style={{ margin: "20px" }}
              className="w-1/2 md:w-1/3 xl:w-1/4 p-4 border text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto mb-4"
              />
              <h2 className="text-lg">{item.name}</h2>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default MenuPage;
