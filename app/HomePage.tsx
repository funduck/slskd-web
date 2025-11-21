"use client";

import { useEffect } from "react";
import { useHeader } from "./Header";

export default function HomePage() {
  const { setMiddle } = useHeader();

  useEffect(() => {
    setMiddle(<div className="text-xl font-semibold">Slskd Home</div>);
  }, [setMiddle]);

  return <>Home</>;
}
