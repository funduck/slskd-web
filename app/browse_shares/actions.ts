"use server";

import { Directory } from "@/generated/slskd-api";
import { usersApiClient, withToken } from "@/lib/api-clients";
import { responsesCache } from "@/lib/cache";
import { buildFSTreeFromDirectories, DirectoryTreeNode, DirectoryTreeNodeDto, findNodeByPath } from "@/lib/directories";

/**
 * Browse children of a specific directory for lazy loading
 * @param token - Authentication token
 * @param username - Username to browse
 * @param directoryPath - Full path of the directory to browse (empty for root)
 * @returns DirectoryTreeNode or error string
 */
export async function browseUserDirectoryAction(
  token: string,
  { username, directoryPath }: { username: string; directoryPath: string }
): Promise<DirectoryTreeNodeDto | string> {
  try {
    const cacheKey = `browseUserDirectory:${username}`;
    let tree: DirectoryTreeNode | undefined = responsesCache.get(cacheKey);
    if (!tree) {
      console.log(`Fetching all directories for ${username}`);
      const response = await usersApiClient.apiV0UsersUsernameBrowseGet(
        {
          username,
        },
        withToken(token)
      );
      tree = buildFSTreeFromDirectories(response.directories || []);
      responsesCache.set(cacheKey, tree);
      console.log(`Cached full tree for ${username}`);
    }

    const node = directoryPath ? findNodeByPath(tree, directoryPath) : tree;
    if (!node) {
      console.warn(`Directory not found: ${directoryPath}`);
      return "Directory not found";
    }

    console.log(`Returning node for ${directoryPath || "(root)"} with ${node.children.size} children`);
    return node.toPlain();
  } catch (error) {
    console.error(`Failed to fetch directory ${directoryPath}:`, error);
    return String(error);
  }
}
