import clsx from "clsx";
import React, { useEffect, useState } from "react";

export interface Item {
  id: number;
  name: React.ReactNode | string;
  percentage: number;
}

interface PercentageDistributorProps {
  items: Item[];
  onValidSubmit: (distributedPercentages: Item[]) => void;
}

export const PercentageDistributor: React.FC<PercentageDistributorProps> = ({
  items,
  onValidSubmit,
}) => {
  const [data, setData] = useState<Item[]>(items);
  const [totalPercentage, setTotalPercentage] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    setTotalPercentage(total);
    setIsValid(total === 100);
  }, [data]);

  const handleChange = (id: number, value: number) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, percentage: value } : item
    );
    setData(updatedData);
  };

  const handleBlur = () => {
    if (totalPercentage > 100) {
      alert("Total percentage cannot exceed 100%");
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onValidSubmit(data);
    } else {
      alert("Please ensure the total percentage equals 100%");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-2.5 gap-x-2.5">
      {data.map((item) => (
        <div
          key={item.id}
          className="  w-2/5 min-w-80  p-4 bg-gray-100 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{item.name}</span>
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
                "w-16 p-2 border rounded text-right block w-fit max-w-xs px-4 py-2 text-sm font-normal shadow-xs  rounded-full placeholder-red-400 focus:outline-none leading-relaxed",
                totalPercentage > 100
                  ? "text-red-600  border-red-500"
                  : " text-emerald-600  border-emerald-300"
              )}
            />
          </div>
          {/* <input type="text" id="default-search"  placeholder="name@pagedone.com" required=""> */}

          <input
            type="range"
            min="0"
            max="100"
            value={item.percentage}
            onChange={(e) =>
              handleChange(item.id, parseInt(e.target.value, 10))
            }
            className="mt-2 w-full"
          />
        </div>
      ))}
    </div>
  );
};
