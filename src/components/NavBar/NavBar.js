import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full bg-[#F9F9F7] items-center py-4 px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="flex items-center">
        <img src={logo} alt="Smoke House Restaurant Logo" className="w-40 md:w-48 lg:w-56 xl:w-64" />
      </div>
      <ul className="flex justify-between items-center gap-12 text-[#925036] font-semibold">
        <li className="hidden md:block">
          <NavLink to="/menu" activeClassName="active" className="nav-link cursor-pointer">
            Menu
          </NavLink>
        </li>
        <li className="hidden md:block">
          <NavLink to="/offers" activeClassName="active" className="nav-link cursor-pointer">
            Offers
          </NavLink>
        </li>
        <li className="hidden md:block">
          <NavLink to="/calendar" activeClassName="active" className="nav-link cursor-pointer">
            Calendar
          </NavLink>
        </li>
        <li className="hidden md:block">
          <NavLink to="/login" activeClassName="active" className="nav-link cursor-pointer">
            Log In
          </NavLink>
        </li>
        <li className="md:hidden">
          <button className="nav-link cursor-pointer text-[#925036] bg-white outline-1 px-4 py-2 rounded-full font-semibold border border-black">
            Menu
          </button>
        </li>
      </ul>
      <NavLink to="/book-now" activeClassName="active" className="nav-link cursor-pointer text-[#925036] bg-white outline-1 px-4 py-2 rounded-full font-semibold border border-black">
        Book Now
      </NavLink>
    </nav>
  );
};

export default Navbar;