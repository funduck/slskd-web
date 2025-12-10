"use server";

import { transfersApiClient, withToken } from "@/lib/api-clients";
import type { QueueDownloadRequest, TransfersUserResponse } from "@/lib/api-types";
import { DownloadRequest } from "./DownloadsContext";

/**
 * Get all downloads
 * @param token - Authentication token
 * @returns Array of transfers or error string
 */
export async function getAllDownloadsAction(token: string): Promise<TransfersUserResponse[] | string> {
  try {
    const response = await transfersApiClient.apiV0TransfersDownloadsGet(
      {
        include_removed: false,
      },
      withToken(token)
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch downloads:", error);
    return String(error);
  }
}

/**
 * Enqueue downloads for a user
 * @param token - Authentication token
 * @param username - Username to download from
 * @param files - Array of files to download
 * @returns Success (void) or error string
 */
export async function enqueueDownloadsAction(
  token: string,
  username: string,
  files: DownloadRequest[]
): Promise<void | string> {
  try {
    const requests: QueueDownloadRequest[] = files.map((file) => ({
      filename: file.filename,
      size: file.size,
    }));

    await transfersApiClient.apiV0TransfersDownloadsUsernamePost(
      {
        username,
        slskd_transfers_api_queue_download_request: requests,
      },
      withToken(token)
    );

    console.log(`Enqueued ${files.length} downloads from ${username}`);
  } catch (error) {
    console.error("Failed to enqueue downloads:", error);
    return String(error);
  }
}

/**
 * Cancel a download
 * @param token - Authentication token
 * @param username - Username
 * @param id - Download ID
 * @param remove - Whether to remove the download from the list
 * @returns Success (void) or error string
 */
export async function cancelDownloadAction(
  token: string,
  username: string,
  id: string,
  remove?: boolean
): Promise<void | string> {
  try {
    console.log(`Attempting to cancel download: username=${username}, id=${id}, remove=${remove}`);

    await transfersApiClient.apiV0TransfersDownloadsUsernameIdDelete(
      {
        username,
        id,
        remove,
      },
      withToken(token)
    );

    console.log(`Successfully canceled download ${id} for ${username}`);
  } catch (error) {
    console.error("Failed to cancel download:", error);
    return String(error);
  }
}

/**
 * Clear all completed downloads
 * @param token - Authentication token
 * @returns Success (void) or error string
 */
export async function clearCompletedDownloadsAction(token: string): Promise<void | string> {
  try {
    await transfersApiClient.apiV0TransfersDownloadsAllCompletedDelete(withToken(token));
    console.log("Cleared all completed downloads");
  } catch (error) {
    console.error("Failed to clear completed downloads:", error);
    return String(error);
  }
}
