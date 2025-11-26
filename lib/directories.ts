import { Directory } from "@/generated/slskd-api";
import { File } from "./api-clients";

export class DirectoryTreeNode {
  // Full original path
  name: string = "";

  // Current path segment
  node?: string;

  files?: File[];

  children: Map<string, DirectoryTreeNode> = new Map();

  parent?: DirectoryTreeNode;

  constructor(node?: string) {
    this.node = node;
  }
}

export function buildFSTreeFromDirectories(directories: Directory[]): DirectoryTreeNode {
  const root = new DirectoryTreeNode();

  let separator = "/";
  // Check a few directory names to see if they use backslashes
  let countSlashOrBackslash = 0;
  for (const directory of directories) {
    if (directory.name && directory.name.includes("\\")) {
      countSlashOrBackslash--;
    }
    if (directory.name && directory.name.includes("/")) {
      countSlashOrBackslash++;
    }
    if (Math.abs(countSlashOrBackslash) >= 3) {
      break;
    }
  }
  if (countSlashOrBackslash < 0) {
    separator = "\\";
  }

  for (const directory of directories) {
    if (!directory.name) continue;

    const pathParts = directory.name.split(separator).filter((part) => part.length > 0);
    let currentLevel = root;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (!currentLevel.children.has(part)) {
        const newNode = new DirectoryTreeNode(part);
        newNode.parent = currentLevel;
        newNode.name = directory.name;
        if (directory.files) {
          newNode.files = directory.files;
        }
        currentLevel.children.set(part, newNode);
      }
      currentLevel = currentLevel.children.get(part)!;
    }
  }

  return root;
}
