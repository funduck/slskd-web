import { Directory } from "@/generated/slskd-api";
import { File } from "./api-clients";

export type DirectoryTreeNodeDto = {
  node: string;
  name: string;
  files?: File[];
  children: DirectoryTreeNodeDto[];
};

export class DirectoryTreeNode {
  // Full original path
  name: string = "";

  // Current path segment
  node: string;

  files?: File[];

  // May be empty if not loaded yet
  children: Map<string, DirectoryTreeNode> = new Map();

  // Track if children have been loaded from server
  childrenLoaded: boolean = false;

  // Track if this node has potential children (directories inside)
  hasChildren: boolean = false;

  parent?: DirectoryTreeNode;

  constructor(node: string) {
    this.node = node;
  }

  clone(): DirectoryTreeNode {
    const newNode = new DirectoryTreeNode(this.node);
    newNode.name = this.name;
    newNode.files = this.files ? [...this.files] : undefined;
    newNode.children = new Map(this.children);
    newNode.parent = this.parent;
    newNode.childrenLoaded = this.childrenLoaded;
    newNode.hasChildren = this.hasChildren;
    return newNode;
  }

  filter({ name }: { name: string }): DirectoryTreeNode | null {
    if (this.node!.includes(name)) {
      return this;
    }

    const children = new Map<string, DirectoryTreeNode>();
    for (const [childName, childNode] of this.children.entries()) {
      const filteredChild = childNode.filter({ name });
      if (filteredChild) {
        children.set(childName, filteredChild);
      }
    }

    if (children.size > 0) {
      const newNode = this.clone();
      newNode.children = children;
      return newNode;
    }

    return null;
  }

  toPlain(): DirectoryTreeNodeDto {
    return {
      node: this.node,
      name: this.name,
      files: this.files,
      children: Array.from(this.children.values()).map((child) => child.toPlain()),
    };
  }

  static fromPlain(obj: DirectoryTreeNodeDto): DirectoryTreeNode {
    const node = new DirectoryTreeNode(obj.node);
    node.name = obj.name;
    node.files = obj.files;
    for (const childObj of obj.children || []) {
      const childNode = DirectoryTreeNode.fromPlain(childObj);
      childNode.parent = node;
      node.children.set(childNode.node, childNode);
    }
    return node;
  }
}

export function buildFSTreeFromDirectories(
  directories: Directory[],
  existingTree?: DirectoryTreeNode
): DirectoryTreeNode {
  const root = existingTree || new DirectoryTreeNode("");

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
        currentLevel.hasChildren = true;
      }
      currentLevel = currentLevel.children.get(part)!;
    }
  }

  return root;
}

/**
 * Find a node in the tree by its full path
 *
 * @param root - Root of the tree to search
 * @param path - Full path of the node to find (e.g., "Music/Rock/Beatles")
 * @param separator - Path separator to use (default: auto-detect)
 * @returns The found node or null if not found
 */
export function findNodeByPath(root: DirectoryTreeNode, path: string, separator?: string): DirectoryTreeNode | null {
  if (!path) return root;

  // Auto-detect separator if not provided
  if (!separator) {
    separator = path.includes("\\") ? "\\" : "/";
  }

  const pathParts = path.split(separator).filter((part) => part.length > 0);
  let currentLevel = root;

  for (const part of pathParts) {
    const child = currentLevel.children.get(part);
    if (!child) return null;
    currentLevel = child;
  }

  return currentLevel;
}

/**
 * Mark a node and its ancestors as having loaded children
 * This is useful when directories are loaded for a specific path
 *
 * @param node - The node whose children have been loaded
 */
export function markChildrenLoaded(node: DirectoryTreeNode): void {
  node.childrenLoaded = true;
}

/**
 * Merge new directories into an existing tree structure
 * This is useful for lazy loading - as new directories are fetched,
 * they can be merged into the existing tree
 *
 * @param existingTree - The existing tree to merge into
 * @param newDirectories - New directories to add
 * @param parentPath - Optional parent path that was used to fetch these directories
 * @returns The updated root node
 */
export function mergeDirectoriesIntoTree(
  existingTree: DirectoryTreeNode,
  newDirectories: Directory[],
  parentPath?: string
): DirectoryTreeNode {
  const updatedTree = buildFSTreeFromDirectories(newDirectories, existingTree);

  // Mark the parent node as having loaded children
  if (parentPath) {
    const parentNode = findNodeByPath(updatedTree, parentPath);
    if (parentNode) {
      markChildrenLoaded(parentNode);
    }
  } else {
    // If no parent path, we loaded root level
    markChildrenLoaded(updatedTree);
  }

  return updatedTree;
}

/**
 * Get all directories that are direct children of a given parent path
 * This can be used to filter API requests for lazy loading
 *
 * @param directories - All directories
 * @param parentPath - Parent path to filter by (empty string for root level)
 * @param separator - Path separator (default: auto-detect)
 * @returns Directories that are direct children of parentPath
 */
export function filterDirectoriesByParent(
  directories: Directory[],
  parentPath: string,
  separator?: string
): Directory[] {
  // Auto-detect separator from first directory if not provided
  if (!separator && directories.length > 0) {
    const firstPath = directories[0].name || "";
    separator = firstPath.includes("\\") ? "\\" : "/";
  }
  separator = separator || "/";

  const normalizedParent = parentPath
    ? parentPath
        .split(separator)
        .filter((p) => p.length > 0)
        .join(separator)
    : "";

  return directories.filter((dir) => {
    if (!dir.name) return false;

    const pathParts = dir.name.split(separator).filter((part) => part.length > 0);

    // Root level
    if (!normalizedParent) {
      return pathParts.length === 1;
    }

    const parentParts = normalizedParent.split(separator);

    // Must be exactly one level deeper than parent
    if (pathParts.length !== parentParts.length + 1) {
      return false;
    }

    // Must start with parent path
    for (let i = 0; i < parentParts.length; i++) {
      if (pathParts[i] !== parentParts[i]) {
        return false;
      }
    }

    return true;
  });
}
