# UsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0UsersUsernameBrowseGet**](UsersApi.md#apiv0usersusernamebrowseget) | **GET** /api/v0/users/{username}/browse | Retrieves the files shared by the specified username. |
| [**apiV0UsersUsernameBrowseStatusGet**](UsersApi.md#apiv0usersusernamebrowsestatusget) | **GET** /api/v0/users/{username}/browse/status | Retrieves the status of the current browse operation for the specified username, if any. |
| [**apiV0UsersUsernameDirectoryPost**](UsersApi.md#apiv0usersusernamedirectorypost) | **POST** /api/v0/users/{username}/directory | Retrieves the files from the specified directory from the specified username. |
| [**apiV0UsersUsernameEndpointGet**](UsersApi.md#apiv0usersusernameendpointget) | **GET** /api/v0/users/{username}/endpoint | Retrieves the address of the specified username. |
| [**apiV0UsersUsernameInfoGet**](UsersApi.md#apiv0usersusernameinfoget) | **GET** /api/v0/users/{username}/info | Retrieves information about the specified username. |
| [**apiV0UsersUsernameStatusGet**](UsersApi.md#apiv0usersusernamestatusget) | **GET** /api/v0/users/{username}/status | Retrieves status for the specified username. |



## apiV0UsersUsernameBrowseGet

> SoulseekBrowseResponse apiV0UsersUsernameBrowseGet(username)

Retrieves the files shared by the specified username.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV0UsersUsernameBrowseGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // string | The username of the user.
    username: username_example,
  } satisfies ApiV0UsersUsernameBrowseGetRequest;

  try {
    const data = await api.apiV0UsersUsernameBrowseGet(body);
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
| **username** | `string` | The username of the user. | [Defaults to `undefined`] |

### Return type

[**SoulseekBrowseResponse**](SoulseekBrowseResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified user could not be found or is offline. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0UsersUsernameBrowseStatusGet

> SoulseekBrowseProgressUpdatedEventArgs apiV0UsersUsernameBrowseStatusGet(username)

Retrieves the status of the current browse operation for the specified username, if any.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV0UsersUsernameBrowseStatusGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // string | The username of the user.
    username: username_example,
  } satisfies ApiV0UsersUsernameBrowseStatusGetRequest;

  try {
    const data = await api.apiV0UsersUsernameBrowseStatusGet(body);
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
| **username** | `string` | The username of the user. | [Defaults to `undefined`] |

### Return type

[**SoulseekBrowseProgressUpdatedEventArgs**](SoulseekBrowseProgressUpdatedEventArgs.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | No browse operation is in progress for the specified user. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0UsersUsernameDirectoryPost

> Array&lt;SoulseekDirectory&gt; apiV0UsersUsernameDirectoryPost(username, slskd_users_api_directory_contents_request)

Retrieves the files from the specified directory from the specified username.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV0UsersUsernameDirectoryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // string | The username of the user.
    username: username_example,
    // SlskdUsersAPIDirectoryContentsRequest | The directory contents request.
    slskd_users_api_directory_contents_request: ...,
  } satisfies ApiV0UsersUsernameDirectoryPostRequest;

  try {
    const data = await api.apiV0UsersUsernameDirectoryPost(body);
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
| **username** | `string` | The username of the user. | [Defaults to `undefined`] |
| **slskd_users_api_directory_contents_request** | [SlskdUsersAPIDirectoryContentsRequest](SlskdUsersAPIDirectoryContentsRequest.md) | The directory contents request. | |

### Return type

[**Array&lt;SoulseekDirectory&gt;**](SoulseekDirectory.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | The request is invalid. |  -  |
| **404** | The specified user could not be found or is offline. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0UsersUsernameEndpointGet

> SystemNetIPEndPoint apiV0UsersUsernameEndpointGet(username)

Retrieves the address of the specified username.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV0UsersUsernameEndpointGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // string | The username of the user.
    username: username_example,
  } satisfies ApiV0UsersUsernameEndpointGetRequest;

  try {
    const data = await api.apiV0UsersUsernameEndpointGet(body);
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
| **username** | `string` | The username of the user. | [Defaults to `undefined`] |

### Return type

[**SystemNetIPEndPoint**](SystemNetIPEndPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified user could not be found or is offline. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0UsersUsernameInfoGet

> SlskdUsersInfo apiV0UsersUsernameInfoGet(username)

Retrieves information about the specified username.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV0UsersUsernameInfoGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // string | The username of the user.
    username: username_example,
  } satisfies ApiV0UsersUsernameInfoGetRequest;

  try {
    const data = await api.apiV0UsersUsernameInfoGet(body);
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
| **username** | `string` | The username of the user. | [Defaults to `undefined`] |

### Return type

[**SlskdUsersInfo**](SlskdUsersInfo.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified user could not be found or is offline. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0UsersUsernameStatusGet

> SlskdUsersStatus apiV0UsersUsernameStatusGet(username)

Retrieves status for the specified username.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV0UsersUsernameStatusGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // string | The username of the user.
    username: username_example,
  } satisfies ApiV0UsersUsernameStatusGetRequest;

  try {
    const data = await api.apiV0UsersUsernameStatusGet(body);
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
| **username** | `string` | The username of the user. | [Defaults to `undefined`] |

### Return type

[**SlskdUsersStatus**](SlskdUsersStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified user could not be found or is offline. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

