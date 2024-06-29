/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <nav className="flex justify-between w-full bg-[#F9F9F7] items-center py-4 px-8 md:px-12 lg:px-16 xl:px-20 md:mr-4 lg:mr-6 xl:mr-8">
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Smoke House Restaurant Logo"
            className="w-40 md:w-48 lg:w-56 xl:w-64"
          />
        </Link>
      </div>
      <ul className="md:flex hidden justify-between items-center gap-12 text-[#925036] font-semibold">
        <li>
          <NavLink
            to="/menu"
            activeClassName="active"
            className="nav-link cursor-pointer"
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/offers"
            activeClassName="active"
            className="nav-link cursor-pointer"
          >
            Offers
          </NavLink>
        </li>
        {role === "MANAGER" && (
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="active"
              className="nav-link cursor-pointer"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {isAuthenticated ? (
          <li>
            <button onClick={logout} className="nav-link cursor-pointer">
              Log out
            </button>
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              activeClassName="active"
              className="nav-link cursor-pointer"
            >
              Log In
            </NavLink>
          </li>
        )}
      </ul>
      <NavLink
        to="/book-now"
        activeClassName="active"
        className="nav-link cursor-pointer text-[#925036] bg-white outline-1 px-4 py-2 rounded-full font-semibold border text-center border-black"
      >
        Book Now
      </NavLink>
    </nav>
  );
};

export default Navbar;
