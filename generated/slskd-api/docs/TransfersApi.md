# TransfersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0TransfersDownloadsAllCompletedDelete**](TransfersApi.md#apiv0transfersdownloadsallcompleteddelete) | **DELETE** /api/v0/transfers/downloads/all/completed | Removes all completed downloads, regardless of whether they failed or succeeded. |
| [**apiV0TransfersDownloadsGet**](TransfersApi.md#apiv0transfersdownloadsget) | **GET** /api/v0/transfers/downloads | Gets all downloads. |
| [**apiV0TransfersDownloadsUsernameGet**](TransfersApi.md#apiv0transfersdownloadsusernameget) | **GET** /api/v0/transfers/downloads/{username} | Gets all downloads for the specified username. |
| [**apiV0TransfersDownloadsUsernameIdDelete**](TransfersApi.md#apiv0transfersdownloadsusernameiddelete) | **DELETE** /api/v0/transfers/downloads/{username}/{id} | Cancels the specified download. |
| [**apiV0TransfersDownloadsUsernameIdGet**](TransfersApi.md#apiv0transfersdownloadsusernameidget) | **GET** /api/v0/transfers/downloads/{username}/{id} |  |
| [**apiV0TransfersDownloadsUsernameIdPositionGet**](TransfersApi.md#apiv0transfersdownloadsusernameidpositionget) | **GET** /api/v0/transfers/downloads/{username}/{id}/position | Gets the download for the specified username matching the specified filename, and requests  the current place in the remote queue of the specified download. |
| [**apiV0TransfersDownloadsUsernamePost**](TransfersApi.md#apiv0transfersdownloadsusernamepost) | **POST** /api/v0/transfers/downloads/{username} | Enqueues the specified download. |
| [**apiV0TransfersUploadsAllCompletedDelete**](TransfersApi.md#apiv0transfersuploadsallcompleteddelete) | **DELETE** /api/v0/transfers/uploads/all/completed | Removes all completed uploads, regardless of whether they failed or succeeded. |
| [**apiV0TransfersUploadsGet**](TransfersApi.md#apiv0transfersuploadsget) | **GET** /api/v0/transfers/uploads | Gets all uploads. |
| [**apiV0TransfersUploadsUsernameGet**](TransfersApi.md#apiv0transfersuploadsusernameget) | **GET** /api/v0/transfers/uploads/{username} | Gets all uploads for the specified username. |
| [**apiV0TransfersUploadsUsernameIdDelete**](TransfersApi.md#apiv0transfersuploadsusernameiddelete) | **DELETE** /api/v0/transfers/uploads/{username}/{id} | Cancels the specified upload. |
| [**apiV0TransfersUploadsUsernameIdGet**](TransfersApi.md#apiv0transfersuploadsusernameidget) | **GET** /api/v0/transfers/uploads/{username}/{id} | Gets the upload for the specified username matching the specified filename. |



## apiV0TransfersDownloadsAllCompletedDelete

> apiV0TransfersDownloadsAllCompletedDelete()

Removes all completed downloads, regardless of whether they failed or succeeded.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsAllCompletedDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  try {
    const data = await api.apiV0TransfersDownloadsAllCompletedDelete();
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
| **204** | The downloads were removed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersDownloadsGet

> Array&lt;SlskdTransfersAPIUserResponse&gt; apiV0TransfersDownloadsGet(include_removed)

Gets all downloads.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // boolean (optional)
    include_removed: true,
  } satisfies ApiV0TransfersDownloadsGetRequest;

  try {
    const data = await api.apiV0TransfersDownloadsGet(body);
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
| **include_removed** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;SlskdTransfersAPIUserResponse&gt;**](SlskdTransfersAPIUserResponse.md)

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


## apiV0TransfersDownloadsUsernameGet

> SlskdTransfersAPIUserResponse apiV0TransfersDownloadsUsernameGet(username)

Gets all downloads for the specified username.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsUsernameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | 
    username: username_example,
  } satisfies ApiV0TransfersDownloadsUsernameGetRequest;

  try {
    const data = await api.apiV0TransfersDownloadsUsernameGet(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SlskdTransfersAPIUserResponse**](SlskdTransfersAPIUserResponse.md)

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


## apiV0TransfersDownloadsUsernameIdDelete

> apiV0TransfersDownloadsUsernameIdDelete(username, id, remove)

Cancels the specified download.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsUsernameIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | The username of the download source.
    username: username_example,
    // string | The id of the download.
    id: id_example,
    // boolean | A value indicating whether the tracked download should be removed after cancellation. (optional)
    remove: true,
  } satisfies ApiV0TransfersDownloadsUsernameIdDeleteRequest;

  try {
    const data = await api.apiV0TransfersDownloadsUsernameIdDelete(body);
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
| **username** | `string` | The username of the download source. | [Defaults to `undefined`] |
| **id** | `string` | The id of the download. | [Defaults to `undefined`] |
| **remove** | `boolean` | A value indicating whether the tracked download should be removed after cancellation. | [Optional] [Defaults to `false`] |

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
| **204** | The download was cancelled successfully. |  -  |
| **404** | The specified download was not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersDownloadsUsernameIdGet

> SlskdTransfersAPITransfer apiV0TransfersDownloadsUsernameIdGet(username, id)



### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsUsernameIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string
    username: username_example,
    // string
    id: id_example,
  } satisfies ApiV0TransfersDownloadsUsernameIdGetRequest;

  try {
    const data = await api.apiV0TransfersDownloadsUsernameIdGet(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SlskdTransfersAPITransfer**](SlskdTransfersAPITransfer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersDownloadsUsernameIdPositionGet

> SlskdTransfersAPITransfer apiV0TransfersDownloadsUsernameIdPositionGet(username, id)

Gets the download for the specified username matching the specified filename, and requests  the current place in the remote queue of the specified download.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsUsernameIdPositionGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | The username of the download source.
    username: username_example,
    // string | The id of the download.
    id: id_example,
  } satisfies ApiV0TransfersDownloadsUsernameIdPositionGetRequest;

  try {
    const data = await api.apiV0TransfersDownloadsUsernameIdPositionGet(body);
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
| **username** | `string` | The username of the download source. | [Defaults to `undefined`] |
| **id** | `string` | The id of the download. | [Defaults to `undefined`] |

### Return type

[**SlskdTransfersAPITransfer**](SlskdTransfersAPITransfer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified download was not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersDownloadsUsernamePost

> apiV0TransfersDownloadsUsernamePost(username, slskd_transfers_api_queue_download_request)

Enqueues the specified download.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersDownloadsUsernamePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | The username of the download source.
    username: username_example,
    // Array<SlskdTransfersAPIQueueDownloadRequest> | The list of download requests. (optional)
    slskd_transfers_api_queue_download_request: ...,
  } satisfies ApiV0TransfersDownloadsUsernamePostRequest;

  try {
    const data = await api.apiV0TransfersDownloadsUsernamePost(body);
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
| **username** | `string` | The username of the download source. | [Defaults to `undefined`] |
| **slskd_transfers_api_queue_download_request** | `Array<SlskdTransfersAPIQueueDownloadRequest>` | The list of download requests. | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | The download was successfully enqueued. |  -  |
| **403** | The download was rejected. |  -  |
| **500** | An unexpected error was encountered. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersUploadsAllCompletedDelete

> apiV0TransfersUploadsAllCompletedDelete()

Removes all completed uploads, regardless of whether they failed or succeeded.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersUploadsAllCompletedDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  try {
    const data = await api.apiV0TransfersUploadsAllCompletedDelete();
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
| **204** | The uploads were removed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersUploadsGet

> Array&lt;SlskdTransfersAPIUserResponse&gt; apiV0TransfersUploadsGet(include_removed)

Gets all uploads.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersUploadsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // boolean (optional)
    include_removed: true,
  } satisfies ApiV0TransfersUploadsGetRequest;

  try {
    const data = await api.apiV0TransfersUploadsGet(body);
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
| **include_removed** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;SlskdTransfersAPIUserResponse&gt;**](SlskdTransfersAPIUserResponse.md)

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


## apiV0TransfersUploadsUsernameGet

> SlskdTransfersAPIUserResponse apiV0TransfersUploadsUsernameGet(username)

Gets all uploads for the specified username.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersUploadsUsernameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | 
    username: username_example,
  } satisfies ApiV0TransfersUploadsUsernameGetRequest;

  try {
    const data = await api.apiV0TransfersUploadsUsernameGet(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SlskdTransfersAPIUserResponse**](SlskdTransfersAPIUserResponse.md)

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


## apiV0TransfersUploadsUsernameIdDelete

> apiV0TransfersUploadsUsernameIdDelete(username, id, remove)

Cancels the specified upload.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersUploadsUsernameIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | The username of the upload destination.
    username: username_example,
    // string | The id of the upload.
    id: id_example,
    // boolean | A value indicating whether the tracked upload should be removed after cancellation. (optional)
    remove: true,
  } satisfies ApiV0TransfersUploadsUsernameIdDeleteRequest;

  try {
    const data = await api.apiV0TransfersUploadsUsernameIdDelete(body);
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
| **username** | `string` | The username of the upload destination. | [Defaults to `undefined`] |
| **id** | `string` | The id of the upload. | [Defaults to `undefined`] |
| **remove** | `boolean` | A value indicating whether the tracked upload should be removed after cancellation. | [Optional] [Defaults to `false`] |

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
| **204** | The upload was cancelled successfully. |  -  |
| **404** | The specified upload was not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TransfersUploadsUsernameIdGet

> SlskdTransfersAPITransfer apiV0TransfersUploadsUsernameIdGet(username, id)

Gets the upload for the specified username matching the specified filename.

### Example

```ts
import {
  Configuration,
  TransfersApi,
} from '';
import type { ApiV0TransfersUploadsUsernameIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransfersApi();

  const body = {
    // string | The username of the upload destination.
    username: username_example,
    // string | The id of the upload.
    id: id_example,
  } satisfies ApiV0TransfersUploadsUsernameIdGetRequest;

  try {
    const data = await api.apiV0TransfersUploadsUsernameIdGet(body);
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
| **username** | `string` | The username of the upload destination. | [Defaults to `undefined`] |
| **id** | `string` | The id of the upload. | [Defaults to `undefined`] |

### Return type

[**SlskdTransfersAPITransfer**](SlskdTransfersAPITransfer.md)

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

