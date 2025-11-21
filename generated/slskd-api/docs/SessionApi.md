# SessionApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0SessionEnabledGet**](SessionApi.md#apiv0sessionenabledget) | **GET** /api/v0/session/enabled | Checks whether security is enabled. |
| [**apiV0SessionGet**](SessionApi.md#apiv0sessionget) | **GET** /api/v0/session | Checks whether the provided authentication is valid. |
| [**apiV0SessionPost**](SessionApi.md#apiv0sessionpost) | **POST** /api/v0/session | Logs in. |



## apiV0SessionEnabledGet

> boolean apiV0SessionEnabledGet()

Checks whether security is enabled.

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { ApiV0SessionEnabledGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SessionApi();

  try {
    const data = await api.apiV0SessionEnabledGet();
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

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | True if security is enabled, false otherwise. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SessionGet

> apiV0SessionGet()

Checks whether the provided authentication is valid.

This is a no-op provided so that the application can test for an expired token on load.

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { ApiV0SessionGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SessionApi();

  try {
    const data = await api.apiV0SessionGet();
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
| **200** | The authentication is valid. |  -  |
| **401** | Unauthorized |  -  |
| **403** | The authentication is is invalid. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SessionPost

> TokenResponse apiV0SessionPost(login_request)

Logs in.

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { ApiV0SessionPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SessionApi();

  const body = {
    // LoginRequest |  (optional)
    login_request: ...,
  } satisfies ApiV0SessionPostRequest;

  try {
    const data = await api.apiV0SessionPost(body);
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
| **login_request** | [LoginRequest](LoginRequest.md) |  | [Optional] |

### Return type

[**TokenResponse**](TokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Login was successful. |  -  |
| **400** | Bad request. |  -  |
| **401** | Login failed. |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

