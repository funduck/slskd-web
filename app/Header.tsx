"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  middle: ReactNode;
  right: ReactNode;
  setMiddle: (content: ReactNode) => void;
  setRight: (content: ReactNode) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [middle, setMiddle] = useState<ReactNode>(null);
  const [right, setRight] = useState<ReactNode>(null);

  return <HeaderContext.Provider value={{ middle, right, setMiddle, setRight }}>{children}</HeaderContext.Provider>;
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
