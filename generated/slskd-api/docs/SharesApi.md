# SharesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0SharesContentsGet**](SharesApi.md#apiv0sharescontentsget) | **GET** /api/v0/shares/contents | Returns a list of all shared directories and files. |
| [**apiV0SharesDelete**](SharesApi.md#apiv0sharesdelete) | **DELETE** /api/v0/shares | Cancels a share scan, if one is running. |
| [**apiV0SharesGet**](SharesApi.md#apiv0sharesget) | **GET** /api/v0/shares | Gets the current list of shares. |
| [**apiV0SharesIdContentsGet**](SharesApi.md#apiv0sharesidcontentsget) | **GET** /api/v0/shares/{id}/contents | Gets the contents of the share associated with the specified &lt;see paramref&#x3D;\&quot;id\&quot; /&gt;. |
| [**apiV0SharesIdGet**](SharesApi.md#apiv0sharesidget) | **GET** /api/v0/shares/{id} | Gets the share associated with the specified &lt;see paramref&#x3D;\&quot;id\&quot; /&gt;. |
| [**apiV0SharesPut**](SharesApi.md#apiv0sharesput) | **PUT** /api/v0/shares | Initiates a scan of the configured shares. |



## apiV0SharesContentsGet

> Array&lt;SoulseekDirectory&gt; apiV0SharesContentsGet()

Returns a list of all shared directories and files.

### Example

```ts
import {
  Configuration,
  SharesApi,
} from '';
import type { ApiV0SharesContentsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SharesApi();

  try {
    const data = await api.apiV0SharesContentsGet();
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

[**Array&lt;SoulseekDirectory&gt;**](SoulseekDirectory.md)

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


## apiV0SharesDelete

> apiV0SharesDelete()

Cancels a share scan, if one is running.

### Example

```ts
import {
  Configuration,
  SharesApi,
} from '';
import type { ApiV0SharesDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SharesApi();

  try {
    const data = await api.apiV0SharesDelete();
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
| **404** | Not Found |  -  |
| **409** | A share scan was not in progress. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SharesGet

> { [key: string]: Array&lt;SlskdSharesShare&gt;; } apiV0SharesGet()

Gets the current list of shares.

### Example

```ts
import {
  Configuration,
  SharesApi,
} from '';
import type { ApiV0SharesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SharesApi();

  try {
    const data = await api.apiV0SharesGet();
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

**{ [key: string]: Array<SlskdSharesShare>; }**

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


## apiV0SharesIdContentsGet

> Array&lt;SoulseekDirectory&gt; apiV0SharesIdContentsGet(id)

Gets the contents of the share associated with the specified &lt;see paramref&#x3D;\&quot;id\&quot; /&gt;.

### Example

```ts
import {
  Configuration,
  SharesApi,
} from '';
import type { ApiV0SharesIdContentsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SharesApi();

  const body = {
    // string | The id of the share.
    id: id_example,
  } satisfies ApiV0SharesIdContentsGetRequest;

  try {
    const data = await api.apiV0SharesIdContentsGet(body);
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
| **id** | `string` | The id of the share. | [Defaults to `undefined`] |

### Return type

[**Array&lt;SoulseekDirectory&gt;**](SoulseekDirectory.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The requested share could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SharesIdGet

> SlskdSharesShare apiV0SharesIdGet(id)

Gets the share associated with the specified &lt;see paramref&#x3D;\&quot;id\&quot; /&gt;.

### Example

```ts
import {
  Configuration,
  SharesApi,
} from '';
import type { ApiV0SharesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SharesApi();

  const body = {
    // string | The id of the share.
    id: id_example,
  } satisfies ApiV0SharesIdGetRequest;

  try {
    const data = await api.apiV0SharesIdGet(body);
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
| **id** | `string` | The id of the share. | [Defaults to `undefined`] |

### Return type

[**SlskdSharesShare**](SlskdSharesShare.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The requested share could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SharesPut

> apiV0SharesPut()

Initiates a scan of the configured shares.

### Example

```ts
import {
  Configuration,
  SharesApi,
} from '';
import type { ApiV0SharesPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SharesApi();

  try {
    const data = await api.apiV0SharesPut();
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
| **409** | A share scan is already in progress. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

