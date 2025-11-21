# RelayApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0RelayAgentDelete**](RelayApi.md#apiv0relayagentdelete) | **DELETE** /api/v0/relay/agent | Disconnects from the connected controller. |
| [**apiV0RelayAgentPut**](RelayApi.md#apiv0relayagentput) | **PUT** /api/v0/relay/agent | Connects to the configured controller. |
| [**apiV0RelayControllerDownloadsTokenGet**](RelayApi.md#apiv0relaycontrollerdownloadstokenget) | **GET** /api/v0/relay/controller/downloads/{token} | Downloads a file from the connected controller. |
| [**apiV0RelayControllerFilesTokenPost**](RelayApi.md#apiv0relaycontrollerfilestokenpost) | **POST** /api/v0/relay/controller/files/{token} | Uploads a file to the connected controller. |
| [**apiV0RelayControllerSharesTokenPost**](RelayApi.md#apiv0relaycontrollersharestokenpost) | **POST** /api/v0/relay/controller/shares/{token} | Uploads share information to the connected controller. |



## apiV0RelayAgentDelete

> apiV0RelayAgentDelete()

Disconnects from the connected controller.

### Example

```ts
import {
  Configuration,
  RelayApi,
} from '';
import type { ApiV0RelayAgentDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RelayApi();

  try {
    const data = await api.apiV0RelayAgentDelete();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RelayAgentPut

> apiV0RelayAgentPut()

Connects to the configured controller.

### Example

```ts
import {
  Configuration,
  RelayApi,
} from '';
import type { ApiV0RelayAgentPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RelayApi();

  try {
    const data = await api.apiV0RelayAgentPut();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RelayControllerDownloadsTokenGet

> apiV0RelayControllerDownloadsTokenGet(token)

Downloads a file from the connected controller.

### Example

```ts
import {
  Configuration,
  RelayApi,
} from '';
import type { ApiV0RelayControllerDownloadsTokenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RelayApi();

  const body = {
    // string | The unique identifier for the request.
    token: token_example,
  } satisfies ApiV0RelayControllerDownloadsTokenGetRequest;

  try {
    const data = await api.apiV0RelayControllerDownloadsTokenGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **token** | `string` | The unique identifier for the request. | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RelayControllerFilesTokenPost

> apiV0RelayControllerFilesTokenPost(token)

Uploads a file to the connected controller.

### Example

```ts
import {
  Configuration,
  RelayApi,
} from '';
import type { ApiV0RelayControllerFilesTokenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RelayApi();

  const body = {
    // string | The unique identifier for the request.
    token: token_example,
  } satisfies ApiV0RelayControllerFilesTokenPostRequest;

  try {
    const data = await api.apiV0RelayControllerFilesTokenPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **token** | `string` | The unique identifier for the request. | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RelayControllerSharesTokenPost

> apiV0RelayControllerSharesTokenPost(token)

Uploads share information to the connected controller.

### Example

```ts
import {
  Configuration,
  RelayApi,
} from '';
import type { ApiV0RelayControllerSharesTokenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RelayApi();

  const body = {
    // string | The unique identifier for the request.
    token: token_example,
  } satisfies ApiV0RelayControllerSharesTokenPostRequest;

  try {
    const data = await api.apiV0RelayControllerSharesTokenPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **token** | `string` | The unique identifier for the request. | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

