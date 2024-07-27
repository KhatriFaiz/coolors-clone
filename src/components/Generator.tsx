"use client";

import { generateColorCode } from "@/utils/generateColorCode";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_COLOR_COUNT = 5;

const Generator = () => {
  const [colors, setColors] = useState<string[]>([]);
  const colorsLengthRef = useRef(DEFAULT_COLOR_COUNT);

  const changeAllColors = useCallback((count: number) => {
    const newColors = Array.from({ length: count }).map(() =>
      generateColorCode()
    );
    setColors(newColors);
    colorsLengthRef.current = count;
  }, []);

  // Load colors the first time component renders
  useEffect(() => {
    changeAllColors(colorsLengthRef.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault(); // Prevent default behaviour to prevent side-effects
        changeAllColors(colorsLengthRef.current);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [colorsLengthRef.current]);

  const addColor = (index: number) => {
    const newColors = [
      ...colors.slice(0, index),
      generateColorCode(),
      ...colors.slice(index),
    ];
    setColors(newColors);
    colorsLengthRef.current = newColors.length;
  };

  const handleCopyHEX = (HEXCode: string) => {
    navigator.clipboard.writeText(HEXCode);
  };

  const COLUMNS_COUNT = colorsLengthRef.current;

  return (
    <section
      style={{ gridTemplateColumns: `repeat(${COLUMNS_COUNT},1fr auto)` }}
      className={`h-[calc(100vh-80px)] grid relative`}
    >
      <AnimatePresence initial={false}>
        {colors.map((color, index) => (
          <Fragment key={color}>
            <ColorTile color={color} handleCopyHEX={handleCopyHEX} />
            {index + 1 !== colors.length && (
              <AddColorTile addColor={addColor} index={index + 1} />
            )}
          </Fragment>
        ))}
      </AnimatePresence>

      <div className="md:hidden absolute top-full -translate-y-full w-full h-10 flex justify-center items-center bg-white">
        <button
          className="text-black bg-white border border-black px-3"
          onClick={() => changeAllColors(colors.length)}
        >
          Generate
        </button>
      </div>
    </section>
  );
};

interface ColorTileProps {
  color: string;
  handleCopyHEX: (HEXCode: string) => void;
}

const ColorTile = ({ color, handleCopyHEX }: ColorTileProps) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      style={{ background: color }}
      key={color}
      layout
    >
      <div className="px-6 md:pb-20 flex justify-end md:justify-center items-center md:items-end h-full">
        <button
          className="bg-white text-black px-3 h-8 flex justify-center items-center"
          onClick={() => handleCopyHEX(color)}
          title="Copy color code"
        >
          {color}
        </button>
      </div>
    </motion.div>
  );
};

interface AddColorTileProps {
  index: number;
  addColor: (index: number) => void;
}

const AddColorTile = ({ addColor, index }: AddColorTileProps) => {
  const variants = {
    visible: { scale: 1 },
    hidden: { scale: 0 },
  };

  return (
    <div className="relative w-0">
      <motion.div
        initial="hidden"
        animate="hidden"
        whileHover="visible"
        className="absolute bottom-0 left-0 top-0 flex -translate-x-1/2 items-center px-10"
      >
        <motion.button
          className="bg-white text-black px-2 py-1 rounded-md scale-0"
          onClick={() => addColor(index)}
          variants={variants}
        >
          Add
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Generator;
