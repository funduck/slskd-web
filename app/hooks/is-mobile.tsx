import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useIsMobile() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return isMobile;
}
