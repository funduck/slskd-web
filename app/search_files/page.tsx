"use client";

import { useEffect } from "react";
import { useHeader } from "../Header";

export default function SearchPage() {
  const { setMiddle, setRight } = useHeader();

  useEffect(() => {
    setMiddle(<></>);
    setRight(<></>);
  }, [setMiddle, setRight]);

  return <div>{/* Search functionality will go here */}</div>;
}
