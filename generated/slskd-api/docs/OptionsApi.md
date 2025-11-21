# OptionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0OptionsDebugGet**](OptionsApi.md#apiv0optionsdebugget) | **GET** /api/v0/options/debug | Gets the debug view of the current application options. |
| [**apiV0OptionsGet**](OptionsApi.md#apiv0optionsget) | **GET** /api/v0/options | Gets the current application options. |
| [**apiV0OptionsStartupGet**](OptionsApi.md#apiv0optionsstartupget) | **GET** /api/v0/options/startup | Gets the application options provided at startup. |
| [**apiV0OptionsYamlGet**](OptionsApi.md#apiv0optionsyamlget) | **GET** /api/v0/options/yaml |  |
| [**apiV0OptionsYamlLocationGet**](OptionsApi.md#apiv0optionsyamllocationget) | **GET** /api/v0/options/yaml/location |  |
| [**apiV0OptionsYamlPost**](OptionsApi.md#apiv0optionsyamlpost) | **POST** /api/v0/options/yaml |  |
| [**apiV0OptionsYamlValidatePost**](OptionsApi.md#apiv0optionsyamlvalidatepost) | **POST** /api/v0/options/yaml/validate |  |



## apiV0OptionsDebugGet

> string apiV0OptionsDebugGet()

Gets the debug view of the current application options.

### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsDebugGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  try {
    const data = await api.apiV0OptionsDebugGet();
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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsGet

> Options apiV0OptionsGet()

Gets the current application options.

### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  try {
    const data = await api.apiV0OptionsGet();
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

[**Options**](Options.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsStartupGet

> Options apiV0OptionsStartupGet()

Gets the application options provided at startup.

### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsStartupGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  try {
    const data = await api.apiV0OptionsStartupGet();
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

[**Options**](Options.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsYamlGet

> apiV0OptionsYamlGet()



### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsYamlGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  try {
    const data = await api.apiV0OptionsYamlGet();
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


## apiV0OptionsYamlLocationGet

> apiV0OptionsYamlLocationGet()



### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsYamlLocationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  try {
    const data = await api.apiV0OptionsYamlLocationGet();
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


## apiV0OptionsYamlPost

> apiV0OptionsYamlPost(body)



### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsYamlPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  const body = {
    // string (optional)
    body: body_example,
  } satisfies ApiV0OptionsYamlPostRequest;

  try {
    const data = await api.apiV0OptionsYamlPost(body);
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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsYamlValidatePost

> apiV0OptionsYamlValidatePost(body)



### Example

```ts
import {
  Configuration,
  OptionsApi,
} from '';
import type { ApiV0OptionsYamlValidatePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OptionsApi();

  const body = {
    // string (optional)
    body: body_example,
  } satisfies ApiV0OptionsYamlValidatePostRequest;

  try {
    const data = await api.apiV0OptionsYamlValidatePost(body);
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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

