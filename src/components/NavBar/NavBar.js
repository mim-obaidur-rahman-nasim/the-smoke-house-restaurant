/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../shared/Logo";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <div className="bg-gray-100">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
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
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
        </div>
        <div className="navbar-end">
          <NavLink
            to="/book-now"
            activeClassName="active"
            className="nav-link text-sm cursor-pointer text-[#925036] bg-white outline-1 px-4 py-2 rounded-full font-semibold border text-center border-black"
          >
            Book Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
