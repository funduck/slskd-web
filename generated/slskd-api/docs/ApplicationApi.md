# ApplicationApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0ApplicationDelete**](ApplicationApi.md#apiv0applicationdelete) | **DELETE** /api/v0/application | Stops the application. |
| [**apiV0ApplicationDumpGet**](ApplicationApi.md#apiv0applicationdumpget) | **GET** /api/v0/application/dump | Generates a memory dump for debugging purposes. |
| [**apiV0ApplicationGcPost**](ApplicationApi.md#apiv0applicationgcpost) | **POST** /api/v0/application/gc | Forces garbage collection. |
| [**apiV0ApplicationGet**](ApplicationApi.md#apiv0applicationget) | **GET** /api/v0/application | Gets the current state of the application. |
| [**apiV0ApplicationLoopbackPost**](ApplicationApi.md#apiv0applicationloopbackpost) | **POST** /api/v0/application/loopback | Loopback endpoint for testing. |
| [**apiV0ApplicationPut**](ApplicationApi.md#apiv0applicationput) | **PUT** /api/v0/application | Restarts the application. |
| [**apiV0ApplicationVersionGet**](ApplicationApi.md#apiv0applicationversionget) | **GET** /api/v0/application/version | Gets the current application version. |
| [**apiV0ApplicationVersionLatestGet**](ApplicationApi.md#apiv0applicationversionlatestget) | **GET** /api/v0/application/version/latest | Checks for updates. |



## apiV0ApplicationDelete

> apiV0ApplicationDelete()

Stops the application.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  try {
    const data = await api.apiV0ApplicationDelete();
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
| **204** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationDumpGet

> Blob apiV0ApplicationDumpGet()

Generates a memory dump for debugging purposes.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationDumpGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  try {
    const data = await api.apiV0ApplicationDumpGet();
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

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The memory dump file. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationGcPost

> apiV0ApplicationGcPost()

Forces garbage collection.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationGcPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  try {
    const data = await api.apiV0ApplicationGcPost();
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
| **200** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationGet

> SlskdState apiV0ApplicationGet()

Gets the current state of the application.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  try {
    const data = await api.apiV0ApplicationGet();
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

[**SlskdState**](SlskdState.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationLoopbackPost

> apiV0ApplicationLoopbackPost(body)

Loopback endpoint for testing.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationLoopbackPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  const body = {
    // any |  (optional)
    body: ...,
  } satisfies ApiV0ApplicationLoopbackPostRequest;

  try {
    const data = await api.apiV0ApplicationLoopbackPost(body);
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
| **body** | `any` |  | [Optional] |

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
| **200** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationPut

> apiV0ApplicationPut()

Restarts the application.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  try {
    const data = await api.apiV0ApplicationPut();
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
| **204** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationVersionGet

> string apiV0ApplicationVersionGet()

Gets the current application version.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationVersionGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  try {
    const data = await api.apiV0ApplicationVersionGet();
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

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ApplicationVersionLatestGet

> SlskdVersionState apiV0ApplicationVersionLatestGet(force_check)

Checks for updates.

### Example

```ts
import {
  Configuration,
  ApplicationApi,
} from '';
import type { ApiV0ApplicationVersionLatestGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ApplicationApi();

  const body = {
    // boolean |  (optional)
    force_check: true,
  } satisfies ApiV0ApplicationVersionLatestGetRequest;

  try {
    const data = await api.apiV0ApplicationVersionLatestGet(body);
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
| **force_check** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**SlskdVersionState**](SlskdVersionState.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

