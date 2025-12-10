"use server";

import { searchesApiClient, withToken } from "@/lib/api-clients";
import type { FileModel, SearchModel, SearchResponse } from "@/lib/api-types";
import { responsesCache } from "@/lib/cache";
import { DirectoryTreeNode, DirectoryTreeNodeDto, buildFSTreeFromFiles } from "@/lib/directories";

interface UserResponseSummary {
  username: string;
  fileCount: number;
  lockedFileCount: number;
  hasFreeUploadSlot: boolean;
  uploadSpeed: number;
  queueLength: number;
}

interface SearchSummaryCache {
  search_text?: string | null;
  responses: SearchResponse[];
  userSummaries: UserResponseSummary[];
}

/**
 * Initiates a search request
 */
export async function searchFilesAction(
  token: string,
  request: {
    id: string;
    search_text: string;
    response_limit?: number;
    search_timeout?: number;
  },
): Promise<SearchModel[] | string> {
  try {
    console.log(`Performing search: "${request.search_text}" with id ${request.id}`);

    // Perform the search
    await searchesApiClient.apiV0SearchesPost(
      {
        slskd_search_api_search_request: {
          id: request.id,
          search_text: request.search_text,
          response_limit: request.response_limit || 100,
          search_timeout: request.search_timeout || 15,
        },
      },
      withToken(token),
    );

    console.log(`Search initiated successfully: ${request.id}`);

    // The API returns void immediately. The search runs asynchronously.
    // To get results, use getSearchResultsAction() to poll for results
    return [];
  } catch (error) {
    console.error(`Search failed:`, error);
    return String(error);
  }
}

/**
 * Fetches the results of a search by ID
 * This should be called after initiating a search to retrieve results
 */
export async function getSearchResultsAction(token: string, searchId: string): Promise<SearchModel | string> {
  try {
    console.log(`Fetching results for search: ${searchId}`);

    // Get search results with responses included
    const results = await searchesApiClient.apiV0SearchesIdGet(
      {
        id: searchId,
        include_responses: true,
      },
      withToken(token),
    );

    return results;
  } catch (error) {
    console.error(`Failed to fetch search results:`, error);
    return String(error);
  }
}

/**
 * Gets the list of all searches (active and completed)
 */
export async function getAllSearchesAction(token: string): Promise<SearchModel[] | string> {
  try {
    console.log(`Fetching all searches`);

    const searches = await searchesApiClient.apiV0SearchesGet(withToken(token));

    return searches;
  } catch (error) {
    console.error(`Failed to fetch searches:`, error);
    return String(error);
  }
}

/**
 * Deletes a search by ID
 */
export async function deleteSearchAction(token: string, searchId: string): Promise<boolean | string> {
  try {
    console.log(`Deleting search: ${searchId}`);

    await searchesApiClient.apiV0SearchesIdDelete(
      {
        id: searchId,
      },
      withToken(token),
    );

    console.log(`Search deleted successfully: ${searchId}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete search:`, error);
    return String(error);
  }
}

/**
 * Loads and caches search responses, returns paginated user summaries
 */
export async function getSearchSummaryAction(
  token: string,
  searchId: string,
  { offset = 0, limit = 20 }: { offset?: number; limit?: number } = {},
): Promise<{ search_text?: string | null; users: UserResponseSummary[]; total: number; hasMore: boolean } | string> {
  try {
    const cacheKey = `searchResponses:${searchId}`;
    let started = Date.now();

    let cached: SearchSummaryCache | undefined = responsesCache.get(cacheKey);
    console.log(`Cache lookup for search ${searchId} took ${Date.now() - started}ms`);

    if (!cached) {
      console.log(`Fetching search responses for ${searchId}`);
      started = Date.now();

      const search = await searchesApiClient.apiV0SearchesIdGet(
        {
          id: searchId,
          include_responses: true,
        },
        withToken(token),
      );
      console.log(`Fetched search responses in ${Date.now() - started}ms`);

      if (!search.responses) {
        return { search_text: search.search_text, users: [], total: 0, hasMore: false };
      }

      started = Date.now();
      // Group by username and merge duplicates (if any)
      const responsesByUser = new Map<string, SearchResponse>();

      search.responses.forEach((response) => {
        const username = response.username || "unknown";
        const existing = responsesByUser.get(username);

        if (existing) {
          console.warn(`Merging duplicate responses for user: ${username}`);
          // Merge duplicate user responses (shouldn't happen but just in case)
          existing.file_count = (existing.file_count || 0) + (response.file_count || 0);
          existing.locked_file_count = (existing.locked_file_count || 0) + (response.locked_file_count || 0);
          existing.files = [...(existing.files || []), ...(response.files || [])];
          existing.locked_files = [...(existing.locked_files || []), ...(response.locked_files || [])];
        } else {
          responsesByUser.set(username, response);
        }
      });

      // Convert to array and sort by file count descending
      const sortedResponses = Array.from(responsesByUser.values()).sort((a, b) => {
        const aCount = (a.file_count || 0) + (a.locked_file_count || 0);
        const bCount = (b.file_count || 0) + (b.locked_file_count || 0);
        return bCount - aCount;
      });

      // Create user summaries
      const userSummaries: UserResponseSummary[] = sortedResponses.map((response) => ({
        username: response.username || "unknown",
        fileCount: response.file_count || 0,
        lockedFileCount: response.locked_file_count || 0,
        hasFreeUploadSlot: response.has_free_upload_slot || false,
        uploadSpeed: response.upload_speed || 0,
        queueLength: response.queue_length || 0,
      }));

      cached = {
        search_text: search.search_text,
        responses: sortedResponses,
        userSummaries,
      };

      responsesCache.set(cacheKey, cached);
      console.log(`Processed and cached ${sortedResponses.length} responses in ${Date.now() - started}ms`);
    }

    // Paginate user summaries
    const paginatedUsers = cached.userSummaries.slice(offset, offset + limit);
    const hasMore = offset + limit < cached.userSummaries.length;

    console.log(
      `Returning ${paginatedUsers.length} users (offset: ${offset}, limit: ${limit}, total: ${cached.userSummaries.length})`,
    );

    return {
      search_text: cached.search_text,
      users: paginatedUsers,
      total: cached.userSummaries.length,
      hasMore,
    };
  } catch (error) {
    console.error(`Failed to fetch search user summaries:`, error);
    return String(error);
  }
}

/**
 * Gets files for a specific user from cached search responses
 */
export async function getSearchUserFilesAction(
  token: string,
  searchId: string,
  username: string,
  { offset = 0, limit = 100 }: { offset?: number; limit?: number } = {},
): Promise<{ files: FileModel[]; lockedFiles: FileModel[]; total: number; hasMore: boolean } | string> {
  try {
    const cacheKey = `searchResponses:${searchId}`;
    let cached: SearchSummaryCache | undefined = responsesCache.get(cacheKey);

    if (!cached) {
      // Cache miss - fetch and cache
      console.log(`Cache miss for search ${searchId}, fetching...`);
      const summariesResult = await getSearchSummaryAction(token, searchId, { offset: 0, limit: 1 });
      if (typeof summariesResult === "string") {
        return summariesResult;
      }
      cached = responsesCache.get(cacheKey);
      if (!cached) {
        return "Failed to cache search responses";
      }
    }

    // Find the user's response
    const userResponse = cached.responses.find((r) => r.username === username);
    if (!userResponse) {
      return `No response found for user ${username}`;
    }

    const files = (userResponse.files || []).sort((a, b) => (a.filename ?? "").localeCompare(b.filename ?? ""));
    const lockedFiles = userResponse.locked_files || [];
    const totalFiles = files.length;

    // Paginate files
    const paginatedFiles = files.slice(offset, offset + limit);
    const hasMore = offset + limit < totalFiles;

    console.log(
      `Returning ${paginatedFiles.length} files for ${username} (offset: ${offset}, limit: ${limit}, total: ${totalFiles})`,
    );

    return {
      files: paginatedFiles,
      lockedFiles: offset === 0 ? lockedFiles : [], // Return locked files only on first page
      total: totalFiles,
      hasMore,
    };
  } catch (error) {
    console.error(`Failed to fetch user files:`, error);
    return String(error);
  }
}

interface SearchTreeCache {
  search_text?: string | null;
  userTrees: Map<string, DirectoryTreeNode>;
  userSummaries: UserResponseSummary[];
}

/**
 * Loads and caches search responses as directory trees, returns paginated user summaries
 * This is the tree-based version of getSearchSummaryAction
 */
export async function getSearchTreeSummaryAction(
  token: string,
  searchId: string,
  { offset = 0, limit = 20 }: { offset?: number; limit?: number } = {},
): Promise<{ search_text?: string | null; users: UserResponseSummary[]; total: number; hasMore: boolean } | string> {
  try {
    const cacheKey = `searchTrees:${searchId}`;
    let started = Date.now();

    let cached: SearchTreeCache | undefined = responsesCache.get(cacheKey);
    console.log(`Cache lookup for search trees ${searchId} took ${Date.now() - started}ms`);

    if (!cached) {
      console.log(`Fetching search responses and building trees for ${searchId}`);
      started = Date.now();

      const search = await searchesApiClient.apiV0SearchesIdGet(
        {
          id: searchId,
          include_responses: true,
        },
        withToken(token),
      );
      console.log(`Fetched search responses in ${Date.now() - started}ms`);

      if (!search.responses) {
        return { search_text: search.search_text, users: [], total: 0, hasMore: false };
      }

      started = Date.now();
      // Group by username and merge duplicates (if any)
      const responsesByUser = new Map<string, SearchResponse>();

      search.responses.forEach((response) => {
        const username = response.username || "unknown";
        const existing = responsesByUser.get(username);

        if (existing) {
          console.warn(`Merging duplicate responses for user: ${username}`);
          existing.file_count = (existing.file_count || 0) + (response.file_count || 0);
          existing.locked_file_count = (existing.locked_file_count || 0) + (response.locked_file_count || 0);
          existing.files = [...(existing.files || []), ...(response.files || [])];
          existing.locked_files = [...(existing.locked_files || []), ...(response.locked_files || [])];
        } else {
          responsesByUser.set(username, response);
        }
      });

      // Build directory trees for each user
      const userTrees = new Map<string, DirectoryTreeNode>();
      for (const [username, response] of responsesByUser.entries()) {
        const allFiles = [...(response.files || []), ...(response.locked_files || [])];
        const tree = buildFSTreeFromFiles(allFiles);
        userTrees.set(username, tree);
      }
      console.log(`Built trees for ${userTrees.size} users in ${Date.now() - started}ms`);

      // Convert to array and sort by file count descending
      const sortedResponses = Array.from(responsesByUser.values()).sort((a, b) => {
        const aCount = (a.file_count || 0) + (a.locked_file_count || 0);
        const bCount = (b.file_count || 0) + (b.locked_file_count || 0);
        return bCount - aCount;
      });

      // Create user summaries
      const userSummaries: UserResponseSummary[] = sortedResponses.map((response) => ({
        username: response.username || "unknown",
        fileCount: response.file_count || 0,
        lockedFileCount: response.locked_file_count || 0,
        hasFreeUploadSlot: response.has_free_upload_slot || false,
        uploadSpeed: response.upload_speed || 0,
        queueLength: response.queue_length || 0,
      }));

      cached = {
        search_text: search.search_text,
        userTrees,
        userSummaries,
      };

      responsesCache.set(cacheKey, cached);
      console.log(`Processed and cached trees for ${userTrees.size} users in ${Date.now() - started}ms`);
    }

    // Paginate user summaries
    const paginatedUsers = cached.userSummaries.slice(offset, offset + limit);
    const hasMore = offset + limit < cached.userSummaries.length;

    console.log(
      `Returning ${paginatedUsers.length} users (offset: ${offset}, limit: ${limit}, total: ${cached.userSummaries.length})`,
    );

    return {
      search_text: cached.search_text,
      users: paginatedUsers,
      total: cached.userSummaries.length,
      hasMore,
    };
  } catch (error) {
    console.error(`Failed to fetch search tree summaries:`, error);
    return String(error);
  }
}

/**
 * Gets the directory tree for a specific user from cached search responses
 * Similar to browseUserSharesAction but for search results
 */
export async function getSearchUserTreeAction(
  token: string,
  searchId: string,
  username: string,
  { directoryPath = "", depth, filter }: { directoryPath?: string; depth?: number; filter?: string } = {},
): Promise<DirectoryTreeNodeDto | string> {
  try {
    const cacheKey = `searchTrees:${searchId}`;
    let started = Date.now();

    let cached: SearchTreeCache | undefined = responsesCache.get(cacheKey);

    if (!cached) {
      // Cache miss - fetch and cache by calling getSearchTreeSummaryAction
      console.log(`Cache miss for search trees ${searchId}, fetching...`);
      const summariesResult = await getSearchTreeSummaryAction(token, searchId, { offset: 0, limit: 1 });
      if (typeof summariesResult === "string") {
        return summariesResult;
      }
      cached = responsesCache.get(cacheKey);
      if (!cached) {
        return "Failed to cache search trees";
      }
    }

    let tree = cached.userTrees.get(username);
    if (!tree) {
      return `No tree found for user ${username}`;
    }

    if (filter) {
      console.log(`Applying filter "${filter}" for user ${username} in search ${searchId}`);
      started = Date.now();
      const filterLower = filter.toLowerCase();
      const filteredTree = tree.filter((item) => item.name.toLowerCase().includes(filterLower));
      if (!filteredTree) {
        console.warn(`No directories match filter "${filter}" for user ${username}`);
        return "No directories match filter";
      }
      tree = filteredTree;
      console.log(`Filtered tree for user ${username} in ${Date.now() - started}ms`);
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
    console.error(`Failed to get tree for user ${username}:`, error);
    return String(error);
  }
}
