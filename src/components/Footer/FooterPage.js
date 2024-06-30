/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Logo from "../shared/Logo";

const FooterPage = () => {
  const currentYear = 2024;
  return (
    <footer>
      <div className="flex flex-col justify-center items-center p-10 bg-[#2c2c2c] gap-6">
        <Logo />

        <div className="text-center text-gray-200 text-sm">
          <p className="pt-2">
            In the new era of technology we look a in the future with certainty
            and pride to for our company and.
          </p>

          <p>copyright &copy; {currentYear} The Smoke House Restaurant</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
