"use client";

import { useEffect } from "react";
import { useHeader } from "../Header";

export default function SharesPage() {
  const { setMiddle, setRight } = useHeader();

  useEffect(() => {
    setMiddle(<></>);
    setRight(<></>);
  }, [setMiddle, setRight]);

  return <div>{/* Browse shares functionality will go here */}</div>;
}
