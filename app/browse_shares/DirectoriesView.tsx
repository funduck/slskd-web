// import { Paper, Text, Group, Badge, ScrollArea, Center, Loader } from "@mantine/core";
// import { IconFolder } from "@tabler/icons-react";
// import { useCallback, useRef } from "react";
// import { useBrowseShares } from "./BrowseSharesContext";
// import { Directory } from "@/generated/slskd-api";

// export function DirectoryItem({ directory }: { directory: Directory }) {
//   const { name, file_count } = directory;
//   const { selectedDirectory, setSelectedDirectory } = useBrowseShares();

//   const isSelected = selectedDirectory === name;

//   return (
//     <Paper
//       p="xs"
//       style={{ cursor: "pointer" }}
//       bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
//       onClick={() => setSelectedDirectory(name || null)}
//     >
//       <Group justify="space-between" align="center">
//         <Group gap="sm" align="center">
//           <IconFolder size={20} />
//           <Text fw={500}>{name}</Text>
//         </Group>
//         <Badge variant="light" color={file_count ? "blue" : "gray"}>
//           {file_count} {file_count === 1 ? "file" : "files"}
//         </Badge>
//       </Group>
//     </Paper>
//   );
// }

// export default function DirectoriesView() {
//   const { result, loading, hasMore, loadMore } = useBrowseShares();
//   const directories = result?.directories || [];

//   const scrollViewportRef = useRef<HTMLDivElement>(null);

//   const handleScroll = useCallback(() => {
//     const viewport = scrollViewportRef.current;
//     if (!viewport || loading || !hasMore) return;

//     const { scrollTop, scrollHeight, clientHeight } = viewport;
//     const scrolledToBottom = scrollHeight - scrollTop - clientHeight < clientHeight; // Trigger when within one viewport height from bottom

//     if (scrolledToBottom) {
//       loadMore();
//     }
//   }, [loading, hasMore, loadMore]);

//   return (
//     <ScrollArea viewportRef={scrollViewportRef} onScrollPositionChange={handleScroll} className="flex-column">
//       {directories
//         .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")) // May slow down with many directories
//         .map((directory, index) => (
//           <DirectoryItem key={index} directory={directory} />
//         ))}
//       {loading && (
//         <Center p="md">
//           <Loader size="sm" />
//         </Center>
//       )}
//       {!hasMore && directories.length > 0 && (
//         <Center p="md">
//           <Text size="sm" c="dimmed">
//             No more folders
//           </Text>
//         </Center>
//       )}
//     </ScrollArea>
//   );
// }
