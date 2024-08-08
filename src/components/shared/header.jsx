import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`opacity-85 fixed p-3 top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{
        backgroundColor: showHeader
          ? "rgba(237, 107, 49, 1)"
          : "rgba(237, 107, 49, 0.8)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src="logo-sm.png" alt="Suitmedia" className="h-16" />
          </NavLink>

          {/* Hamburger Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-8 text-white">
            {["Work", "About", "Services", "Ideas", "Careers", "Contact"].map(
              (item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="inline-flex items-center px-1 hover:border-b-2 hover:text-base font-medium hover:border-white hover:font-bold"
                  activeClassName="border-orange-500 text-gray-900"
                >
                  {item}
                </NavLink>
              )
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed  inset-0 bg-white transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex h-screen bg-white flex-col justify-center items-center py-10">
            {["Work", "About", "Services", "Ideas", "Careers", "Contact"].map(
              (item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-orange-500 text-lg font-medium"
                >
                  {item}
                </NavLink>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
