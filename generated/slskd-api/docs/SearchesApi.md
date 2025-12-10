# SearchesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0SearchesGet**](SearchesApi.md#apiv0searchesget) | **GET** /api/v0/searches | Gets the list of active and completed searches. |
| [**apiV0SearchesIdDelete**](SearchesApi.md#apiv0searchesiddelete) | **DELETE** /api/v0/searches/{id} | Deletes the search corresponding to the specified id. |
| [**apiV0SearchesIdGet**](SearchesApi.md#apiv0searchesidget) | **GET** /api/v0/searches/{id} | Gets the state of the search corresponding to the specified id. |
| [**apiV0SearchesIdPut**](SearchesApi.md#apiv0searchesidput) | **PUT** /api/v0/searches/{id} | Stops the search corresponding to the specified id. |
| [**apiV0SearchesIdResponsesGet**](SearchesApi.md#apiv0searchesidresponsesget) | **GET** /api/v0/searches/{id}/responses | Gets the state of the search corresponding to the specified id. |
| [**apiV0SearchesPost**](SearchesApi.md#apiv0searchespost) | **POST** /api/v0/searches | Performs a search for the specified request. |



## apiV0SearchesGet

> Array&lt;SlskdSearchSearch&gt; apiV0SearchesGet()

Gets the list of active and completed searches.

### Example

```ts
import {
  Configuration,
  SearchesApi,
} from '';
import type { ApiV0SearchesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchesApi();

  try {
    const data = await api.apiV0SearchesGet();
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

[**Array&lt;SlskdSearchSearch&gt;**](SlskdSearchSearch.md)

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


## apiV0SearchesIdDelete

> apiV0SearchesIdDelete(id)

Deletes the search corresponding to the specified id.

### Example

```ts
import {
  Configuration,
  SearchesApi,
} from '';
import type { ApiV0SearchesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchesApi();

  const body = {
    // string | The unique id of the search.
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV0SearchesIdDeleteRequest;

  try {
    const data = await api.apiV0SearchesIdDelete(body);
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
| **id** | `string` | The unique id of the search. | [Defaults to `undefined`] |

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
| **204** | The search was deleted. |  -  |
| **404** | A search with the specified id could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SearchesIdGet

> SlskdSearchSearch apiV0SearchesIdGet(id, include_responses)

Gets the state of the search corresponding to the specified id.

### Example

```ts
import {
  Configuration,
  SearchesApi,
} from '';
import type { ApiV0SearchesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchesApi();

  const body = {
    // string | The unique id of the search.
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | A value indicating whether to include search responses in the response. (optional)
    include_responses: true,
  } satisfies ApiV0SearchesIdGetRequest;

  try {
    const data = await api.apiV0SearchesIdGet(body);
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
| **id** | `string` | The unique id of the search. | [Defaults to `undefined`] |
| **include_responses** | `boolean` | A value indicating whether to include search responses in the response. | [Optional] [Defaults to `false`] |

### Return type

[**SlskdSearchSearch**](SlskdSearchSearch.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | A matching search was not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SearchesIdPut

> apiV0SearchesIdPut(id)

Stops the search corresponding to the specified id.

### Example

```ts
import {
  Configuration,
  SearchesApi,
} from '';
import type { ApiV0SearchesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchesApi();

  const body = {
    // string | The unique id of the search.
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV0SearchesIdPutRequest;

  try {
    const data = await api.apiV0SearchesIdPut(body);
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
| **id** | `string` | The unique id of the search. | [Defaults to `undefined`] |

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
| **200** | The search was stopped. |  -  |
| **304** | The search was not in progress. |  -  |
| **404** | A matching search was not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SearchesIdResponsesGet

> Array&lt;SlskdSearchResponse&gt; apiV0SearchesIdResponsesGet(id)

Gets the state of the search corresponding to the specified id.

### Example

```ts
import {
  Configuration,
  SearchesApi,
} from '';
import type { ApiV0SearchesIdResponsesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchesApi();

  const body = {
    // string | The unique id of the search.
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV0SearchesIdResponsesGetRequest;

  try {
    const data = await api.apiV0SearchesIdResponsesGet(body);
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
| **id** | `string` | The unique id of the search. | [Defaults to `undefined`] |

### Return type

[**Array&lt;SlskdSearchResponse&gt;**](SlskdSearchResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | A matching search was not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0SearchesPost

> SlskdSearchSearch apiV0SearchesPost(slskd_search_api_search_request)

Performs a search for the specified request.

### Example

```ts
import {
  Configuration,
  SearchesApi,
} from '';
import type { ApiV0SearchesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchesApi();

  const body = {
    // SlskdSearchAPISearchRequest | The search request. (optional)
    slskd_search_api_search_request: ...,
  } satisfies ApiV0SearchesPostRequest;

  try {
    const data = await api.apiV0SearchesPost(body);
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
| **slskd_search_api_search_request** | [SlskdSearchAPISearchRequest](SlskdSearchAPISearchRequest.md) | The search request. | [Optional] |

### Return type

[**SlskdSearchSearch**](SlskdSearchSearch.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The search completed successfully. |  -  |
| **400** | The specified request was malformed. |  -  |
| **500** | The search terminated abnormally. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

