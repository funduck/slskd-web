"use server";

import { usersApiClient, withToken } from "@/lib/api-clients";
import { responsesCache } from "@/lib/cache";
import { DirectoryTreeNode, DirectoryTreeNodeDto } from "@/lib/directories";

/**
 * Browse children of a specific directory for lazy loading
 * @param token - Authentication token
 * @param username - Username to browse
 * @param directoryPath - Full path of the directory to browse (empty for root)
 * @returns DirectoryTreeNode or error string
 */
export async function browseUserSharesAction(
  token: string,
  {
    username,
    directoryPath,
    depth,
    filter,
  }: { username: string; depth?: number; directoryPath: string; filter?: string }
): Promise<DirectoryTreeNodeDto | string> {
  try {
    const cacheKey = `browseUserShares:${username}`;
    let started = Date.now();
    let tree: DirectoryTreeNode | undefined = responsesCache.get(cacheKey);
    console.log(`Cache lookup for "${username}" took ${Date.now() - started}ms`);
    if (!tree) {
      console.log(`Fetching all directories for "${username}" from server`);

      started = Date.now();
      const response = await usersApiClient.apiV0UsersUsernameBrowseGet(
        {
          username,
        },
        withToken(token)
      );
      console.log(`Fetched directories for "${username}" in ${Date.now() - started}ms`);

      started = Date.now();
      tree = DirectoryTreeNode.fromDirectories(response.directories || []);
      console.log(`Built tree for "${username}" in ${Date.now() - started}ms`);

      started = Date.now();
      responsesCache.set(cacheKey, tree);
      console.log(`Cached full tree for "${username}" in ${Date.now() - started}ms`);

      console.log(
        `Cached full tree for "${username}" with ${tree.children.size} root directories in ${Date.now() - started}ms`
      );
    }

    if (filter) {
      console.log(`Applying filter "${filter}" for "${username}"`);
      started = Date.now();
      const filterLower = filter.toLowerCase();
      const filteredTree = tree.filter((item) => item.name.toLowerCase().includes(filterLower));
      if (!filteredTree) {
        console.warn(`No directories match filter "${filter}" for "${username}"`);
        return "No directories match filter";
      }
      tree = filteredTree;
      console.log(`Filtered tree for "${username}" in ${Date.now() - started}ms`);
    }

    started = Date.now();
    const node = directoryPath ? tree.findNodeByPath(directoryPath) : tree;
    console.log(`Finding node for "${directoryPath || "(root)"}" took ${Date.now() - started}ms`);
    if (!node) {
      console.warn(`Directory not found: "${directoryPath}"`);
      return "Directory not found";
    }

    console.log(`Returning node for "${directoryPath || "(root)"}" with ${node.children.size} children`);
    started = Date.now();
    const dto = node.toPlain({ depth });
    console.log(`Converted node to plain DTO in ${Date.now() - started}ms`);
    return dto;
  } catch (error) {
    console.error(`Failed to fetch directory "${directoryPath}":`, error);
    return String(error);
  }
}
