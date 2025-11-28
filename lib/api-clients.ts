import {
  Configuration,
  FileModel,
  HTTPRequestInit,
  InitOverrideFunction,
  Middleware,
  RequestOpts,
  SessionApi,
  TransfersApi,
  UsersApi,
} from "@/generated/slskd-api";
import { getServerConfig } from "./config";
import { AuthFailureError } from "./errors";
import { headers } from "next/headers";

// Middlewares

// Error handler middleware
function createErrorHandler(name?: string): Middleware {
  name = name || "API";
  return {
    async post(context) {
      if (!context.response.ok) {
        let text = context.response.statusText;
        try {
          text = JSON.stringify(await context.response.json());
        } catch {
          try {
            text = await context.response.text();
          } catch {
            // Keep the statusText if we can't get response body
          }
        }

        console.error(
          `${name} request ${context.init.method} ${context.url} failed with status ${context.response.status}: ${text}`
        );

        throw new Error(`${name} error: ${text} during request ${context.init.method} ${context.url}`);
      }

      console.debug(
        `${name} request ${context.init.method} ${context.url} completed with status ${context.response.status}`
      );

      return context.response;
    },
  };
}

// Logout handler middleware
function createLogoutHandler(): Middleware {
  return {
    async post(context) {
      if (context.response.status === 401) {
        throw new AuthFailureError("Authentication failed");
      }
      return context.response;
    },
  };
}

export function withToken(token: string | null): InitOverrideFunction | undefined {
  if (token) {
    return async ({ init, context }: { init: HTTPRequestInit; context: RequestOpts }): Promise<RequestInit> => {
      init.headers = init.headers || {};
      init.headers["Authorization"] = `Bearer ${token}`;
      return init;
    };
  }
  return;
}

export type File = FileModel; // codegen worked weird with "File" name, so it became FileModel

// After initialization, these will hold the API clients
export let sessionApiClient: SessionApi;
export let usersApiClient: UsersApi;
export let transfersApiClient: TransfersApi;

function initializeApiClients() {
  const serverConfig = getServerConfig();

  const conf = new Configuration({
    basePath: serverConfig.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    middleware: [createErrorHandler(), createLogoutHandler()],
  });

  sessionApiClient = new SessionApi(conf);
  usersApiClient = new UsersApi(conf);
  transfersApiClient = new TransfersApi(conf);
}

initializeApiClients();
