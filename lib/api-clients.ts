import {
  Configuration as ConfigurationClass,
  SearchesApi as SearchesApiClass,
  SessionApi as SessionApiClass,
  TransfersApi as TransfersApiClass,
  UsersApi as UsersApiClass,
} from "@/generated/slskd-api";
import type {
  HTTPRequestInit,
  InitOverrideFunction,
  Middleware,
  RequestOpts,
  SearchesApi,
  SessionApi,
  TransfersApi,
  UsersApi,
} from "@/lib/api-types";

import { getServerConfig } from "./config";
import { AuthFailureError } from "./errors";

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
          `${name} request ${context.init.method} ${context.url} failed with status ${context.response.status}: ${text}`,
        );

        throw new Error(`${name} error: ${text} during request ${context.init.method} ${context.url}`);
      }

      console.debug(
        `${name} request ${context.init.method} ${context.url} completed with status ${context.response.status}`,
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

// After initialization, these will hold the API clients
export let sessionApiClient: SessionApi;
export let usersApiClient: UsersApi;
export let transfersApiClient: TransfersApi;
export let searchesApiClient: SearchesApi;

function initializeApiClients() {
  const serverConfig = getServerConfig();

  const conf = new ConfigurationClass({
    basePath: serverConfig.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    middleware: [createErrorHandler(), createLogoutHandler()],
  });

  sessionApiClient = new SessionApiClass(conf);
  usersApiClient = new UsersApiClass(conf);
  transfersApiClient = new TransfersApiClass(conf);
  searchesApiClient = new SearchesApiClass(conf);
}

initializeApiClients();
