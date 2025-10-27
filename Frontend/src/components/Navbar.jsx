import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav
      className="fixed top-0 left-0 w-[100%] bg-black/70 text-white flex justify-between items-center px-10 py-2 z-50"
    >
      <div
        className="flex flex-col items-center"
      >
        <div className="text-yellow-600 text-xl font-bold tracking-[2px]">
          Seventh Day 
        </div>
        <div className="text-sm tracking-wide text-gray-300 -mt-1">Adventist Church</div>
      </div>

      <ul className="flex gap-6 list-none">
        <li>
          <Link
            to="/home"
            className="hover:text-yellow-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/member"
            className="hover:text-yellow-600 transition-colors"
          >
            Members
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-yellow-600 transition-colors"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="hover:text-yellow-600 transition-colors"
          >
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
