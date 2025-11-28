"use client";

import React from "react";

const Lines = () => {
  return (
    <div className="fixed left-0 top-0 -z-20 flex h-full w-full items-center justify-around pointer-events-none">
      {/* Vertical gradient lines */}
      <span className="flex h-full w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-line1"></span>
      <span className="flex h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-line2"></span>
      <span className="flex h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-line3"></span>

      {/* Horizontal gradient lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"></div>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"></div>
      <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
    </div>
  );
};

export default Lines;
