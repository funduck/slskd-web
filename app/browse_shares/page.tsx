"use client";

import { useEffect } from "react";
import { useHeader } from "../Header";
import { SearchInput } from "./SearchInput";
import { Results } from "./Results";
import { Group } from "@mantine/core";
import { FilterInput } from "./FilterInput";
import { useBrowseShares } from "./BrowseSharesContext";

export default function () {
  const { result } = useBrowseShares();

  const { setMiddle, setRight } = useHeader();

  useEffect(() => {
    setMiddle(<SearchInput />);
    setRight(<></>);
  }, [setMiddle, setRight]);

  return (
    <>
      <Group>
        <b>Folders:</b>
        {result?.directory_count}
      </Group>
      <FilterInput />
      <Results />
    </>
  );
}
