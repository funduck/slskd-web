"use client";

import { useEffect } from "react";
import { useHeader } from "../Header";
import { Flex } from "@mantine/core";
import { SearchInput } from "./SearchInput";
import { Results } from "./Results";

export default function () {
  const { setMiddle, setRight } = useHeader();

  useEffect(() => {
    setMiddle(<SearchInput />);
    setRight(<></>);
  }, [setMiddle, setRight]);

  return (
    <Flex align="center" gap="md">
      <Results />
    </Flex>
  );
}
