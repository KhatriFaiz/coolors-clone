"use client";

import { generateColorCode } from "@/utils/generateColorCode";
import React, { useEffect, useState } from "react";

const Generator = () => {
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    handleUpdateColors();
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        handleUpdateColors();
      }
    });
  }, []);

  const handleUpdateColors = () => {
    setColors([
      generateColorCode(),
      generateColorCode(),
      generateColorCode(),
      generateColorCode(),
      generateColorCode(),
    ]);
  };

  const handleCopyHEX = (HEXCode: string) => {
    navigator.clipboard.writeText(HEXCode);
  };

  return (
    <section className="h-[calc(100vh-80px)] grid md:grid-cols-5 relative">
      {colors.map((color) => (
        <div style={{ background: color }} key={color}>
          <div className="px-6 md:pb-20 flex justify-end md:justify-center items-center md:items-end h-full">
            <button
              className="bg-white text-black px-3 h-8 flex justify-center items-center"
              onClick={() => handleCopyHEX(color)}
              title="Copy color code"
            >
              {color}
            </button>
          </div>
        </div>
      ))}

      <div className="md:hidden absolute top-full -translate-y-full w-full h-10 flex justify-center items-center bg-white">
        <button
          className="text-black bg-white border border-black px-3"
          onClick={() => handleUpdateColors()}
        >
          Generate
        </button>
      </div>
    </section>
  );
};

export default Generator;
