import { Configuration, Middleware, UsersApi } from "@/generated/slskd-api";
import { getServerConfig } from "./config";

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

// Authentication handler middleware
function createAuthHandler(): Middleware {
  return {
    async pre(context) {
      const token = getToken();
      if (!isPassthroughEnabled() && token) {
        context.init.headers = {
          ...context.init.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return context;
    },
  };
}

// Logout handler middleware
function createLogoutHandler(): Middleware {
  return {
    async post(context) {
      if (context.response.status === 401) {
        clearToken();
      }
      return context.response;
    },
  };
}

// Token management
let token: string | null = null;

const getToken = () => token;

const setToken = (newToken: string | null) => {
  token = newToken;
};

const clearToken = () => {
  token = null;
};

const isPassthroughEnabled = () => getToken() === getServerConfig().tokenPassthroughValue;

// After initialization, these will hold the API clients
export let usersApiClient: UsersApi;

function initializeApiClients() {
  const serverConfig = getServerConfig();

  const conf = new Configuration({
    basePath: serverConfig.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    middleware: [createAuthHandler(), createErrorHandler(), createLogoutHandler()],
  });

  usersApiClient = new UsersApi(conf);
}

initializeApiClients();
