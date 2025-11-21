# FilesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameDelete**](FilesApi.md#apiv0filesdownloadsdirectoriesbase64subdirectorynamedelete) | **DELETE** /api/v0/files/downloads/directories/{base64SubdirectoryName} | Deletes the specified subdirectory within the downloads directory. |
| [**apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameGet**](FilesApi.md#apiv0filesdownloadsdirectoriesbase64subdirectorynameget) | **GET** /api/v0/files/downloads/directories/{base64SubdirectoryName} | Lists the contents of the specified subdirectory within the downloads directory. |
| [**apiV0FilesDownloadsDirectoriesGet**](FilesApi.md#apiv0filesdownloadsdirectoriesget) | **GET** /api/v0/files/downloads/directories | Lists the contents of the downloads directory. |
| [**apiV0FilesDownloadsFilesBase64FileNameDelete**](FilesApi.md#apiv0filesdownloadsfilesbase64filenamedelete) | **DELETE** /api/v0/files/downloads/files/{base64FileName} | Deletes the specified file within the downloads directory. |
| [**apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameDelete**](FilesApi.md#apiv0filesincompletedirectoriesbase64subdirectorynamedelete) | **DELETE** /api/v0/files/incomplete/directories/{base64SubdirectoryName} | Deletes the specified subdirectory within the downloads directory. |
| [**apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameGet**](FilesApi.md#apiv0filesincompletedirectoriesbase64subdirectorynameget) | **GET** /api/v0/files/incomplete/directories/{base64SubdirectoryName} | Lists the contents of the specified subdirectory within the incomplete directory. |
| [**apiV0FilesIncompleteDirectoriesGet**](FilesApi.md#apiv0filesincompletedirectoriesget) | **GET** /api/v0/files/incomplete/directories | Lists the contents of the downloads directory. |
| [**apiV0FilesIncompleteFilesBase64FileNameDelete**](FilesApi.md#apiv0filesincompletefilesbase64filenamedelete) | **DELETE** /api/v0/files/incomplete/files/{base64FileName} | Deletes the specified file within the downloads directory. |



## apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameDelete

> apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameDelete(base64_subdirectory_name)

Deletes the specified subdirectory within the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesDownloadsDirectoriesBase64SubdirectoryNameDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // string | The relative, base 64 encoded, name of the subdirectory to delete.
    base64_subdirectory_name: base64_subdirectory_name_example,
  } satisfies ApiV0FilesDownloadsDirectoriesBase64SubdirectoryNameDeleteRequest;

  try {
    const data = await api.apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameDelete(body);
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
| **base64_subdirectory_name** | `string` | The relative, base 64 encoded, name of the subdirectory to delete. | [Defaults to `undefined`] |

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
| **401** | Authentication failed. |  -  |
| **403** | Access to the specified subdirectory was denied. |  -  |
| **404** | The specified subdirectory does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameGet

> FilesystemDirectory apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameGet(base64_subdirectory_name, recursive)

Lists the contents of the specified subdirectory within the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesDownloadsDirectoriesBase64SubdirectoryNameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // string | The relative, base 64 encoded, name of the subdirectory to list.
    base64_subdirectory_name: base64_subdirectory_name_example,
    // boolean | An optional value indicating whether to recursively list subdirectories and files. (optional)
    recursive: true,
  } satisfies ApiV0FilesDownloadsDirectoriesBase64SubdirectoryNameGetRequest;

  try {
    const data = await api.apiV0FilesDownloadsDirectoriesBase64SubdirectoryNameGet(body);
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
| **base64_subdirectory_name** | `string` | The relative, base 64 encoded, name of the subdirectory to list. | [Defaults to `undefined`] |
| **recursive** | `boolean` | An optional value indicating whether to recursively list subdirectories and files. | [Optional] [Defaults to `false`] |

### Return type

[**FilesystemDirectory**](FilesystemDirectory.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **401** | Authentication failed. |  -  |
| **403** | Access to the specified subdirectory was denied. |  -  |
| **404** | The specified subdirectory does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesDownloadsDirectoriesGet

> FilesystemDirectory apiV0FilesDownloadsDirectoriesGet(recursive)

Lists the contents of the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesDownloadsDirectoriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // boolean | An optional value indicating whether to recursively list subdirectories and files. (optional)
    recursive: true,
  } satisfies ApiV0FilesDownloadsDirectoriesGetRequest;

  try {
    const data = await api.apiV0FilesDownloadsDirectoriesGet(body);
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
| **recursive** | `boolean` | An optional value indicating whether to recursively list subdirectories and files. | [Optional] [Defaults to `false`] |

### Return type

[**FilesystemDirectory**](FilesystemDirectory.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **401** | Authentication failed. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesDownloadsFilesBase64FileNameDelete

> apiV0FilesDownloadsFilesBase64FileNameDelete(base64_file_name)

Deletes the specified file within the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesDownloadsFilesBase64FileNameDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // string | The relative, base 64 encoded, name of the file to delete.
    base64_file_name: base64_file_name_example,
  } satisfies ApiV0FilesDownloadsFilesBase64FileNameDeleteRequest;

  try {
    const data = await api.apiV0FilesDownloadsFilesBase64FileNameDelete(body);
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
| **base64_file_name** | `string` | The relative, base 64 encoded, name of the file to delete. | [Defaults to `undefined`] |

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
| **401** | Authentication failed. |  -  |
| **403** | Access to the specified subdirectory was denied. |  -  |
| **404** | The specified subdirectory does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameDelete

> apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameDelete(base64_subdirectory_name)

Deletes the specified subdirectory within the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesIncompleteDirectoriesBase64SubdirectoryNameDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // string | The relative, base 64 encoded, name of the subdirectory to delete.
    base64_subdirectory_name: base64_subdirectory_name_example,
  } satisfies ApiV0FilesIncompleteDirectoriesBase64SubdirectoryNameDeleteRequest;

  try {
    const data = await api.apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameDelete(body);
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
| **base64_subdirectory_name** | `string` | The relative, base 64 encoded, name of the subdirectory to delete. | [Defaults to `undefined`] |

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
| **401** | Authentication failed. |  -  |
| **403** | Access to the specified subdirectory was denied. |  -  |
| **404** | The specified subdirectory does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameGet

> FilesystemDirectory apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameGet(base64_subdirectory_name, recursive)

Lists the contents of the specified subdirectory within the incomplete directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesIncompleteDirectoriesBase64SubdirectoryNameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // string | The relative, base 64 encoded, name of the subdirectory to list.
    base64_subdirectory_name: base64_subdirectory_name_example,
    // boolean | An optional value indicating whether to recursively list subdirectories and files. (optional)
    recursive: true,
  } satisfies ApiV0FilesIncompleteDirectoriesBase64SubdirectoryNameGetRequest;

  try {
    const data = await api.apiV0FilesIncompleteDirectoriesBase64SubdirectoryNameGet(body);
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
| **base64_subdirectory_name** | `string` | The relative, base 64 encoded, name of the subdirectory to list. | [Defaults to `undefined`] |
| **recursive** | `boolean` | An optional value indicating whether to recursively list subdirectories and files. | [Optional] [Defaults to `false`] |

### Return type

[**FilesystemDirectory**](FilesystemDirectory.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **401** | Authentication failed. |  -  |
| **403** | Access to the specified subdirectory was denied. |  -  |
| **404** | The specified subdirectory does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesIncompleteDirectoriesGet

> FilesystemDirectory apiV0FilesIncompleteDirectoriesGet(recursive)

Lists the contents of the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesIncompleteDirectoriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // boolean | An optional value indicating whether to recursively list subdirectories and files. (optional)
    recursive: true,
  } satisfies ApiV0FilesIncompleteDirectoriesGetRequest;

  try {
    const data = await api.apiV0FilesIncompleteDirectoriesGet(body);
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
| **recursive** | `boolean` | An optional value indicating whether to recursively list subdirectories and files. | [Optional] [Defaults to `false`] |

### Return type

[**FilesystemDirectory**](FilesystemDirectory.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **401** | Authentication failed. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0FilesIncompleteFilesBase64FileNameDelete

> apiV0FilesIncompleteFilesBase64FileNameDelete(base64_file_name)

Deletes the specified file within the downloads directory.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '';
import type { ApiV0FilesIncompleteFilesBase64FileNameDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FilesApi();

  const body = {
    // string | The relative, base 64 encoded, name of the file to delete.
    base64_file_name: base64_file_name_example,
  } satisfies ApiV0FilesIncompleteFilesBase64FileNameDeleteRequest;

  try {
    const data = await api.apiV0FilesIncompleteFilesBase64FileNameDelete(body);
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
| **base64_file_name** | `string` | The relative, base 64 encoded, name of the file to delete. | [Defaults to `undefined`] |

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
| **401** | Authentication failed. |  -  |
| **403** | Access to the specified subdirectory was denied. |  -  |
| **404** | The specified subdirectory does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

