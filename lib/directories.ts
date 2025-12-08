import { Directory, FileModel } from "@/generated/slskd-api";
import { count } from "console";

export type DirectoryTreeNodeDto = {
  node: string;
  name: string;
  files?: FileModel[];
  children: DirectoryTreeNodeDto[];
  childrenLoaded: boolean;
  hasChildren: boolean;
  separator?: string;
};

export class DirectoryTreeNode {
  /** Full original path */
  path: string = "";

  /** Current path segment */
  name: string;

  /** Files directly under this directory */
  files?: FileModel[];

  /** Map of child nodes, keyed by their current path segment */
  children: Map<string, DirectoryTreeNode> = new Map();

  /** Indicates if children have been loaded from the server */
  childrenLoaded: boolean = false;

  /** Indicates if this node has potential children (directories inside) */
  hasChildren: boolean = false;

  parent?: DirectoryTreeNode;

  separator: string = "/";

  constructor(node: string) {
    this.name = node;
  }

  getFullPath(file: FileModel): string {
    if (!file.filename) return "";
    return this.path ? `${this.path}${this.separator}${file.filename}` : file.filename;
  }

  getRoot(): DirectoryTreeNode {
    let current: DirectoryTreeNode = this;
    while (current.parent) {
      current = current.parent;
    }
    return current;
  }

  setSeparator(separator: string) {
    this.separator = separator;
    if (this.children.size > 0) {
      for (const child of this.children.values()) {
        child.setSeparator(separator);
      }
    }
  }

  clone(): DirectoryTreeNode {
    const newNode = new DirectoryTreeNode(this.name);
    newNode.path = this.path;
    newNode.files = this.files ? [...this.files] : undefined;
    newNode.children = new Map(this.children);
    newNode.childrenLoaded = this.childrenLoaded;
    newNode.hasChildren = this.hasChildren;
    newNode.parent = this.parent;
    newNode.separator = this.separator;
    return newNode;
  }

  filter(filter: ((item: DirectoryTreeNode) => boolean) | { name: string }): DirectoryTreeNode | null {
    if (typeof filter === "function" ? filter(this) : this.name.includes(filter.name)) {
      return this;
    }

    const newNode = this.clone();

    const filteredChildren = new Map<string, DirectoryTreeNode>();
    for (const [childName, childNode] of this.children.entries()) {
      const filteredChild = childNode.filter(filter);
      if (filteredChild) {
        filteredChild.parent = newNode;
        filteredChildren.set(childName, filteredChild);
      }
    }

    if (filteredChildren.size > 0) {
      newNode.children = filteredChildren;
      return newNode;
    }

    return null;
  }

  toPlain({ depth }: { depth?: number } = {}): DirectoryTreeNodeDto {
    if (depth === 0) {
      return {
        node: this.name,
        name: this.path,
        files: this.files,
        children: [],
        childrenLoaded: false,
        hasChildren: this.hasChildren,
        separator: this.separator,
      };
    }
    return {
      node: this.name,
      name: this.path,
      files: this.files,
      children: Array.from(this.children.values()).map((child) =>
        child.toPlain({ depth: depth ? depth - 1 : undefined })
      ),
      childrenLoaded: this.childrenLoaded,
      hasChildren: this.hasChildren,
      separator: this.separator,
    };
  }

  static fromPlain(obj: DirectoryTreeNodeDto): DirectoryTreeNode {
    const node = new DirectoryTreeNode(obj.node);
    node.path = obj.name;
    node.files = obj.files;
    node.hasChildren = obj.hasChildren;
    for (const childObj of obj.children || []) {
      const childNode = DirectoryTreeNode.fromPlain(childObj);
      childNode.parent = node;
      node.children.set(childNode.name, childNode);
    }
    node.separator = obj.separator || "/";
    return node;
  }

  static fromDirectories(directories: Directory[]): DirectoryTreeNode {
    return buildFSTreeFromDirectories(directories);
  }

  static fromFiles(files: FileModel[]): DirectoryTreeNode {
    return buildFSTreeFromFiles(files);
  }

  findNodeByPath(path: string): DirectoryTreeNode | null {
    return findNodeByPath(this, path, this.separator);
  }
}

export function buildFSTreeFromDirectories(
  directories: Directory[],
  existingTree?: DirectoryTreeNode
): DirectoryTreeNode {
  const root = existingTree || new DirectoryTreeNode("");

  // Check a few directory names to see if they use backslashes
  let separator = "/";
  let countSlashOrBackslash = 0;
  for (const directory of directories) {
    if (!directory.name) continue;
    const backslashMatches = directory.name.matchAll(/\\/g);
    const slashMatches = directory.name.matchAll(/\//g);
    countSlashOrBackslash += Array.from(slashMatches).length;
    countSlashOrBackslash -= Array.from(backslashMatches).length;
    if (Math.abs(countSlashOrBackslash) >= 10) {
      break;
    }
  }
  if (countSlashOrBackslash < 0) {
    separator = "\\";
  }

  // Set separator on root and check for consistency with existing tree
  if (existingTree && existingTree.separator !== separator) {
    throw new Error("Inconsistent path separators in existing tree and new directories");
  }
  root.getRoot().setSeparator(separator);

  for (const directory of directories) {
    if (directory.name === undefined || directory.name === null) continue;

    const pathParts = directory.name.split(separator).filter((part) => part.length > 0);

    // Handle root directory files (empty path)
    if (pathParts.length === 0) {
      if (directory.files) {
        root.files = directory.files;
      }
      continue;
    }

    let currentLevel = root;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (!currentLevel.children.has(part)) {
        const newNode = new DirectoryTreeNode(part);
        newNode.parent = currentLevel;
        // Build the path incrementally from the root to this node
        const pathSoFar = pathParts.slice(0, i + 1).join(separator);
        newNode.path = pathSoFar;
        currentLevel.children.set(part, newNode);
        currentLevel.childrenLoaded = true;
        currentLevel.hasChildren = true;
      }
      currentLevel = currentLevel.children.get(part)!;

      // Add files to the final node (whether new or existing)
      if (i === pathParts.length - 1 && directory.files) {
        currentLevel.files = directory.files;
      }
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

/**
 * Convert FileModel[] to Directory[] format
 * Groups files by their directory path to create a Directory structure
 *
 * @param files - Array of files to convert
 * @returns Array of directories with grouped files
 */
export function convertFilesToDirectories(files: FileModel[]): Directory[] {
  // Detect separator from file paths
  let separator = "/";
  let countSlashOrBackslash = 0;
  for (const file of files) {
    if (file.filename && file.filename.includes("\\")) {
      countSlashOrBackslash--;
    }
    if (file.filename && file.filename.includes("/")) {
      countSlashOrBackslash++;
    }
    if (Math.abs(countSlashOrBackslash) >= 3) {
      break;
    }
  }
  if (countSlashOrBackslash < 0) {
    separator = "\\";
  }

  // Group files by directory path
  const directoriesMap = new Map<string, FileModel[]>();

  for (const file of files) {
    if (!file.filename) continue;

    const pathParts = file.filename.split(separator).filter((part) => part.length > 0);
    // Directory path is everything except the last part (filename)
    const directoryPath = pathParts.slice(0, -1).join(separator);

    if (!directoriesMap.has(directoryPath)) {
      directoriesMap.set(directoryPath, []);
    }
    directoriesMap.get(directoryPath)!.push({
      ...file,
      filename: pathParts[pathParts.length - 1],
    });
  }

  // Convert to Directory[] format
  return Array.from(directoriesMap.entries()).map(([path, files]) => ({
    name: path,
    files: files,
  }));
}

/**
 * Build a directory tree from a list of files
 * Converts FileModel[] to Directory[] and uses buildFSTreeFromDirectories
 *
 * @param files - Array of files to build tree from
 * @returns Root node of the directory tree
 */
export function buildFSTreeFromFiles(files: FileModel[]): DirectoryTreeNode {
  const directories = convertFilesToDirectories(files);
  return buildFSTreeFromDirectories(directories);
}
