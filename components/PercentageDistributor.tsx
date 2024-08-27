import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
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
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 rounded-lg">
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
                  "w-16 p-2 border rounded text-right",
                  totalPercentage > 100
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={item.percentage}
              onChange={(e) => handleChange(item.id, parseInt(e.target.value, 10))}
              className="mt-2 w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className={clsx("text-lg", isValid ? "text-green-500" : "text-red-500")}>
          Total: {totalPercentage}%
        </div>
        <button
          className={clsx(
            "py-2 px-4 rounded text-white",
            isValid ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          )}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
