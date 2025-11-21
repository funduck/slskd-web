"use client";

import { useEffect } from "react";
import { useHeader } from "./Header";

export default function Home() {
  const { setRight, setMiddle } = useHeader();

  useEffect(() => {
    setMiddle(<></>);
    setRight(<></>);
  }, [setMiddle, setRight]);

  return <></>;
}
