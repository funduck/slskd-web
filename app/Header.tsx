"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Box, Flex } from "@mantine/core";

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

export default function Header() {
  const { middle, right } = useHeader();

  return (
    <Flex justify="space-between" align="center" pt="sm">
      <Box></Box>
      <Box>{middle}</Box>
      <Box>{right}</Box>
    </Flex>
  );
}
