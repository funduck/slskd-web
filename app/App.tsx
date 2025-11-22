"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { Box, Container, Space } from "@mantine/core";

export default function App({ children }: { children: ReactNode }) {
  const topMenuBoxRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const height = topMenuBoxRef.current?.offsetHeight || 0;
      setOffset(height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box
        ref={topMenuBoxRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "var(--mantine-color-body)",
          zIndex: 100,
        }}
      >
        <Header />
        <Navigation />
      </Box>
      <Box
        style={{
          position: "fixed",
          top: 10,
          right: 0,
          zIndex: 101,
        }}
      >
        <UserMenu />
      </Box>
      <Box ref={boxRef} style={{ height: offset || 0 }} mb="xs" />
      <Container size="100%">{children}</Container>
    </>
  );
}
