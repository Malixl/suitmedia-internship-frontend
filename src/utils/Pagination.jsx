import React, { useState } from "react";
import PropTypes from "prop-types";
import ChevronDoubleLeftIcon from "@heroicons/react/24/solid/ChevronDoubleLeftIcon";
import ChevronDoubleRightIcon from "@heroicons/react/24/solid/ChevronDoubleRightIcon";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";

const Pagination = ({ className, page, setPage, meta }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tempPage = Number(urlParams.get("page")) || 1;

  const [pageNumber, setPageNumber] = useState([
    tempPage,
    tempPage + 1,
    tempPage + 2,
    tempPage + 3,
  ]);

  const handleSetPage = (input) => {
    setPage(input);
  };

  const handleArrow = (input) => {
    if (input === "first") {
      setPageNumber([1, 2, 3, 4]);
      setPage(1);
    } else if (input === "last") {
      setPageNumber([
        meta.last_page - 3,
        meta.last_page - 2,
        meta.last_page - 1,
        meta.last_page,
      ]);
      setPage(meta.last_page);
    } else if (input === -1) {
      if (page - 1 < pageNumber[0] && page > 1) {
        setPageNumber((prev) => prev.map((item) => item - 1));
      }
      if (page > 1) {
        setPage(page + Number(input));
      }
    } else if (input === 1) {
      if (
        page + 1 > pageNumber[pageNumber.length - 1] &&
        page < meta.last_page
      ) {
        setPageNumber((prev) => prev.map((item) => item + 1));
      }
      if (page < meta.last_page) {
        setPage(page + Number(input));
      }
    }
  };

  return (
    <div className={`${className} mx-auto flex gap-2`}>
      <ChevronDoubleLeftIcon
        className={`${
          tempPage <= 1 ? "cursor-default fill-gray-400" : ""
        } my-auto h-6 w-6 cursor-pointer`}
        onClick={() => handleArrow("first")}
      />
      <ChevronLeftIcon
        className={`${
          tempPage <= 1 ? "cursor-default fill-gray-400" : ""
        } my-auto h-6 w-6 cursor-pointer`}
        onClick={() => handleArrow(-1)}
      />
      {pageNumber.map((item, index) => (
        <div
          key={index}
          className={`font_roboto_condensed mx-0.5 w-8 cursor-pointer rounded-md py-1 text-center font-medium transition-colors duration-200 ${
            page === item
              ? "bg-orange-500 text-white"
              : "bg-white text-black hover:bg-orange-200"
          }`}
          onClick={() => handleSetPage(item)}
        >
          {item}
        </div>
      ))}
      <ChevronRightIcon
        className={`${
          tempPage >= meta.last_page ? "cursor-default fill-gray-400" : ""
        } my-auto h-6 w-6 cursor-pointer`}
        onClick={() => handleArrow(1)}
      />
      <ChevronDoubleRightIcon
        className={`${
          tempPage >= meta.last_page ? "cursor-default fill-gray-400" : ""
        } my-auto h-6 w-6 cursor-pointer`}
        onClick={() => handleArrow("last")}
      />
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Pagination;
