import React, { useState } from "react";
import clsx from "clsx";
interface SkeletonComponentProps {
  isLoading: boolean;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  type?: "circle" | "bar";
}
const Skeleton: React.FC<SkeletonComponentProps> = ({
  isLoading,
  children,
  width = "w-4 ",
  height = "h-4",
  type = "bar",
}) => {
  if (isLoading) {
    switch (type) {
      case "circle":
        return (
          <p
            className={`flex justify-center items-center bg-gray-300 rounded-full ${width} ${height}  animate-pulse`}
          />
        );
      default:
        return (
          <p
            className={`${height} bg-gray-300 ${width}  animate-pulse rounded-full`}
          />
        );
    }
  } else {
    return children;
  }
};

export default Skeleton;
