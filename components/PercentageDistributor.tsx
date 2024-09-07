import RangeInput from "@/shared/RangeInput";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export interface Item {
  id: number | string;
  name: React.ReactNode | string;
  percentage: number;
}

interface PercentageDistributorProps {
  items: Item[];
  handleChange: (id: number | string, value: number) => void;
}

export const PercentageDistributor: React.FC<PercentageDistributorProps> = ({
  items,
  handleChange,
}) => {
  const [totalPercentage, setTotalPercentage] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.percentage, 0);
    setTotalPercentage(total);
    setIsValid(total === 100);
  }, [items]);

  // const handleChange = (id: number | string, value: number) => {
  //   const updatedData = items.map((item) =>
  //     item.id === id ? { ...item, percentage: value } : item
  //   );
  //   setData(updatedData);
  // };

  const handleBlur = () => {
    if (totalPercentage > 100) {
      alert("Total percentage cannot exceed 100%");
    }
  };

  // const handleSubmit = () => {
  //   if (isValid) {
  //     onValidSubmit(items);
  //     console.log(items);
  //   } else {
  //     alert("Please ensure the total percentage equals 100%");
  //   }
  // };

  return (
    <div className="w-11/12 flex flex-col justify-center gap-y-3 gap-x-3 thin-scrollbar ">
      {items.map((item) => (
        <div
          key={item.id}
          className={clsx(
            "w-full min-w-80 p-4 bg-white border border-indigo-200 rounded-lg shadow transform transition-all duration-300 hover:scale-105",
            totalPercentage > 100
              ? "hover:shadow-lg shadow-red-800 border-red-800  hover:shadow-lg 	"
              : "hover:shadow-md  "
          )}
        >
          <div className="flex justify-between items-center">
            <span className="text-indigo-800 font-semibold">{item.name}</span>
            <input
              type="number"
              min="0"
              max="100"
              value={item.percentage}
              onChange={(e) =>
                handleChange(item.id, parseInt(e.target.value, 10) || 0)
              }
              onBlur={handleBlur}
              className={clsx(
                "w-fit  p-2 border rounded-full text-right block px-4 py-2 text-sm font-normal shadow-sm transition-all duration-300 focus:outline-none focus:ring-2",
                totalPercentage > 100
                  ? "text-red-600 border-red-500 focus:ring-red-200"
                  : "text-emerald-600 border-emerald-300 focus:ring-emerald-200"
              )}
            />
          </div>
          <div className="relative mt-2">
            <RangeInput
              value={item.percentage}
              onChange={(e) => handleChange(item.id, e)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
