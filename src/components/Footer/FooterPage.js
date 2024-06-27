/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import logo from "../../assets/images/logo.svg";

const FooterPage = () => {
  const currentYear = 2024;
  return (
    <footer>
      <div className="flex flex-col justify-center items-center p-10 bg-[#474747]">
        <div>
          <img src={logo}></img>
          <p className=" pt-2">In the new era of technology we look a in the future with certainty and pride to for our company and.</p>
        </div>
        <div className=" pt-4">
          <p>copyright &copy; {currentYear} The Smoke House Restaurant</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
