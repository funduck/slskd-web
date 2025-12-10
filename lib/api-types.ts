/**
 * Type aliases for slskd-api generated types
 *
 * This file provides stable type aliases that insulate the codebase from changes
 * in the generated API types. When the Swagger/OpenAPI spec changes and types
 * are regenerated, we only need to update this file.
 */

// Re-export runtime types used for API configuration
export type {
  Configuration,
  HTTPRequestInit,
  InitOverrideFunction,
  Middleware,
  RequestOpts,
} from "@/generated/slskd-api";

// Re-export API client classes
export type { SessionApi, TransfersApi, UsersApi, SearchesApi } from "@/generated/slskd-api";

// Re-export model types
export type {
  SoulseekDirectory as DirectoryModel,
  SoulseekFile as FileModel,
  SlskdTransfersAPIQueueDownloadRequest as QueueDownloadRequest,
  SlskdSearchSearch as SearchModel,
  SlskdSearchResponse as SearchResponse,
  SlskdTransfersTransfer as TransferModel,
  SlskdTransfersAPIUserResponse as TransfersUserResponse,
} from "@/generated/slskd-api";
