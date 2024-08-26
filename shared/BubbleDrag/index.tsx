import { motion } from "framer-motion";
import { useRef } from "react";

import React, { useEffect, useState } from "react";
import { range as _range, random as _random } from "lodash";

import { BubbleDragProps } from "./typings";

const colors = ["#dddfd4", "#fae596", "#3fb0ac", "#173e43"];

const makeRgbColor = () => colors[_random(0, 3)];
const generateDataset = () => {
  return [
    _random(1, (window.innerWidth - 64) / 2),
    _random(1, window.innerHeight * 0.5),
    makeRgbColor(),
  ];
};
export const BubbleDrag: React.FC<BubbleDragProps> = ({ size, data }) => {
  const constraintsRef = useRef(null);
  const [dataset, setDataset] = useState(generateDataset());
  useEffect(() => {
    const interva = setInterval(() => {
      const newDataset = generateDataset();
      setDataset(newDataset);
    }, 2000);
    return () => {
      clearTimeout(interva);
    };
  }, [data]);

  return (
    <motion.div
      className="absolute w-full h-full  pointer-events-none"
      ref={constraintsRef}
    >
      {/* <motion.circle
        className="w-24 h-24 bg-indigo-500 text-white flex items-center justify-center rounded-full shadow-lg"
        cx={dataset[0]}
        cy={dataset[1]}
        fill={dataset[2] + ""}
        // animate={{ cx: dataset[0], cy: dataset[1] }}
        drag
        dragConstraints={constraintsRef}
        r={_random(1, 5)}
      /> */}

      <motion.div
        layout="size"
        animate={{
          x: dataset[0],
          y: dataset[1],

          backgroundColor: dataset[2] + "",
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="w-24 h-24   text-white flex items-center justify-center rounded-full shadow-lg pointer-events-auto"
        drag
        dragConstraints={constraintsRef}
      >
        {data}
      </motion.div>
    </motion.div>
  );
};
