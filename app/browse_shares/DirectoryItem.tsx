import { Directory } from "@/generated/slskd-api";
import { Paper, Text, Group, Badge } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";

export default function DirectoryItem({ directory }: { directory: Directory }) {
  const { name, file_count } = directory;

  return (
    <Paper p="md" mb="xs" withBorder>
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <IconFolder size={20} />
          <Text fw={500}>{name}</Text>
        </Group>
        <Badge variant="light" color="blue">
          {file_count} {file_count === 1 ? "file" : "files"}
        </Badge>
      </Group>
    </Paper>
  );
}
