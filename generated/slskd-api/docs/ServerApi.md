# ServerApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0ServerDelete**](ServerApi.md#apiv0serverdelete) | **DELETE** /api/v0/server | Disconnects the client. |
| [**apiV0ServerGet**](ServerApi.md#apiv0serverget) | **GET** /api/v0/server | Retrieves the current state of the server. |
| [**apiV0ServerPut**](ServerApi.md#apiv0serverput) | **PUT** /api/v0/server | Connects the client. |



## apiV0ServerDelete

> apiV0ServerDelete(body)

Disconnects the client.

### Example

```ts
import {
  Configuration,
  ServerApi,
} from '';
import type { ApiV0ServerDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ServerApi();

  const body = {
    // string |  (optional)
    body: body_example,
  } satisfies ApiV0ServerDeleteRequest;

  try {
    const data = await api.apiV0ServerDelete(body);
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
| **body** | `string` |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ServerGet

> SlskdCoreAPIServerState apiV0ServerGet()

Retrieves the current state of the server.

### Example

```ts
import {
  Configuration,
  ServerApi,
} from '';
import type { ApiV0ServerGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ServerApi();

  try {
    const data = await api.apiV0ServerGet();
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

[**SlskdCoreAPIServerState**](SlskdCoreAPIServerState.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ServerPut

> apiV0ServerPut()

Connects the client.

### Example

```ts
import {
  Configuration,
  ServerApi,
} from '';
import type { ApiV0ServerPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ServerApi();

  try {
    const data = await api.apiV0ServerPut();
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
| **205** | Reset Content |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

