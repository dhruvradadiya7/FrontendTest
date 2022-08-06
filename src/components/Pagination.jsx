import "../css/pagination.scss";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import usePagination, { DOTS } from "../hooks/usePagination";

import PropTypes from "prop-types";
import React from "react";
import { nanoid } from "nanoid";

function Pagination({
  onPageChange,
  onPageSizeOptionChange,
  totalCount,
  currentPage,
  pageSize,
  pageSizeOptions,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul
      className="wrapper"

      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          aria-label="Goto previous page"
          onClick={onPrevious}
          disabled={currentPage === 1} 
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber) => {
        
        const key = nanoid();

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            className="paginationItem"
            aria-current={pageNumber === currentPage ? "page" : "false"} 
          >
            <button
              type="button"
              aria-label={`Goto page ${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          aria-label="Goto next page"
          onClick={onNext}
          disabled={Math.ceil(totalCount/pageSize) === currentPage}
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        aria-label="Select page size"
        value={pageSize}
        onChange={(e) => {
          onPageSizeOptionChange(e.target.value);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
  pageSizeOptions: [15, 25, 50, 100],
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
};

export default Pagination;
