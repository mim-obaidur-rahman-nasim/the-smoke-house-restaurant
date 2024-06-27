/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import section from "../assets/images/bg.svg";
import menu1 from "../assets/images/menu1.svg";
import menu2 from "../assets/images/menu2.svg";
import menu3 from "../assets/images/menu3.svg";
import menu4 from "../assets/images/menu4.svg";
import content from "../assets/images/Content(1).svg"
import FooterPage from "../components/Footer/FooterPage";

const menuItems = [
  {
    image: menu1,
    title: "Breakfast",
    description: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    image: menu2,
    title: "Main Dishes",
    description: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    image: menu3,
    title: "Drinks",
    description: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    image: menu4,
    title: "Deserts",
    description: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
];

function HomePage() {
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
        <div className="flex flex-col justify-center items-center w-full px-3 md:px-16 lg:px-32 py-32">
          <h1 className=" font-normal text-8xl text-center">
            Best food for
            <br /> your taste
          </h1>
          <p className=" font-normal text-[32px] text-center pt-8">
            Discover delectable cuisine and unforgettable moments in our
            welcoming, culinary haven.
          </p>
          <div className=" flex gap-4 pt-10">
            <button className=" text-base font-bold bg-[#AD343E] p-4 rounded-full">
              Book a Table
            </button>
            <button className=" text-base font-bold p-4 rounded-full border border-black">
              Explore Menu
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center py-10">
        <h1 className=" font-medium text-5xl text-center">Browse Our Menu</h1>
        <div className="flex text-center px-2 md:px-10 lg:px-20 gap-5 pt-10">
          {menuItems.map((menuItem, index) => (
            <div key={index} className="flex flex-col px-10 py-8 justify-center items-center border rounded-2xl">
              <img src={menuItem.image} />
              <h2 className=" text-lg font-semibold pt-[30px] pb-[15px]">
                {menuItem.title}
              </h2>
              <p>{menuItem.description}</p>
              <button className="text-[#AD343E] font-bold pt-[30px] cursor-pointer">
                Explore Menu
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center p-8">
        <img src={content}></img>
      </div>
      <FooterPage />
    </div>
  );
}

export default HomePage;