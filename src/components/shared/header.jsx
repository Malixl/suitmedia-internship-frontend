import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        <div className="flex justify-between h-16">
          <NavLink to="/" className="flex items-center">
            <img
              src="/public/logo/logo-sm.png"
              alt="Suitmedia"
              className="h-16"
            />
          </NavLink>
          <div className="hidden sm:flex sm:space-x-8 text-white">
            {["Work", "About", "Services", "Ideas", "Careers", "Contact"].map(
              (item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="inline-flex items-center px-1  hover:border-b-2 hover: text-base font-medium hover:border-white hover:font-bold"
                  activeClassName="border-orange-500 text-gray-900"
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
