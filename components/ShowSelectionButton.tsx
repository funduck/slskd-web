"use client";

import { Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { useDownload } from "../app/downloads/DownloadContext";

export const ShowSelectionButton = memo(() => {
  const router = useRouter();
  const { stats } = useDownload();

  const handleShowSelection = () => {
    router.push("/downloads?tab=selection");
  };

  if (stats.count === 0) {
    return null;
  }

  return (
    <Button size="xs" variant="light" leftSection={<IconShoppingCart size={16} />} onClick={handleShowSelection}>
      Show selection ({stats.count})
    </Button>
  );
});

ShowSelectionButton.displayName = "ShowSelectionButton";
