import { useEffect, useState } from "react";
import { PaginationProps } from "./typings";
import { useENS } from "@thirdweb-dev/react";

export const Pagination: React.FC<PaginationProps> = ({
  pageSize = 25,
  defaultSelectedPage = 1,
  total = 25,
  onClick,
}) => {
  const [selectedPageNumber, setSelectedPageNumber] =
    useState<number>(defaultSelectedPage);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(total / pageSize)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(total / pageSize));
  }, [pageSize, total]);

  useEffect(() => {
    onClick(selectedPageNumber);
  }, [selectedPageNumber]);
  let arr = Array.apply(null, Array(totalPages || 0)).map(function (y, i) {
    return i;
  });

  return (
    <nav className="flex items-center md:gap-x-4 gap-x-2 min-w-max">
      <a
        className="text-gray-500 hover:text-gray-900 p-4 inline-flex items-center md:mr-8 mr-1 cursor-pointer"
        onClick={() => {
          if (selectedPageNumber > 0) setSelectedPageNumber((prev) => prev - 1);
        }}
      >
        <svg
          className="w-1.5 h-3 mr-3"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 1L1.91421 4.58578C1.24755 5.25245 0.914213 5.58579 0.914213 6C0.914213 6.41421 1.24755 6.74755 1.91421 7.41421L5.5 11"
            stroke="#4F46E5"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Back</span>
      </a>
      <div
        onClick={(e) => {
          console.dir(e.target);
          setSelectedPageNumber(Number(e.target?.id || "1"));
        }}
      >
        {arr.map((pageNumber, idx) => {
          const isSelected = selectedPageNumber === idx;
          return (
            <a
              id={pageNumber + ""}
              key={pageNumber}
              // <a class="w-10 h-10 bg-indigo-600 text-white p-2 inline-flex items-center justify-center rounded-full transition-all duration-150 hover:bg-indigo-600 hover:text-white" href="javascript:;">2</a>

              className={`w-10 h-10 ${
                isSelected ? "text-white" : "text-gray-500"
              } p-2 inline-flex items-center justify-center ${
                isSelected ? "bg-indigo-600" : "bg-gray-100"
              } rounded-full transition-all duration-150 hover: ${
                isSelected ? "bg-indigo-600" : "bg-indigo-50"
              } hover:${isSelected ? "text-white" : "text-gray-900"} `}
              href="javascript:;"
            >
              {pageNumber}
            </a>
          );
        })}
      </div>
      <a
        className="text-gray-500 hover:text-gray-900 p-4 inline-flex items-center md:ml-8 ml-1 cursor-pointer"
        onClick={() => {
          if (selectedPageNumber < totalPages - 1)
            setSelectedPageNumber((prev) => prev + 1);
        }}
      >
        <span>Next</span>
        <svg
          className="w-1.5 h-3 ml-3"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 11L5.08578 7.41421C5.75245 6.74755 6.08579 6.41421 6.08579 6C6.08579 5.58579 5.75245 5.25245 5.08579 4.58579L1.5 1"
            stroke="#4F46E5"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </nav>
  );
};
