import { useEffect, useState } from "react";
import { PaginationProps } from "./typings";

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
      <div
        className="text-gray-500 hover:text-gray-900 p-4 inline-flex items-center md:mr-8 mr-1 cursor-pointer"
        onClick={() => {
          if (selectedPageNumber > 0) setSelectedPageNumber((prev) => prev - 1);
        }}
      >
        <span>Back</span>
      </div>
      <div
        onClick={(e) => {
          console.dir(e.target);
          setSelectedPageNumber(Number((e as unknown as {target: {id: string}}).target?.id || "1"));
        }}
      >
        {arr.map((pageNumber, idx) => {
          const isSelected = selectedPageNumber === idx;
          return (
            <div
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
            >
              {pageNumber}
            </div>
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
      </a>
    </nav>
  );
};
