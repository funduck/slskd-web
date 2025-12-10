# OptionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0OptionsDebugGet**](OptionsApi.md#apiv0optionsdebugget) | **GET** /api/v0/options/debug | Gets the debug view of the current application options. |
| [**apiV0OptionsGet**](OptionsApi.md#apiv0optionsget) | **GET** /api/v0/options | Gets the current application options. |
| [**apiV0OptionsStartupGet**](OptionsApi.md#apiv0optionsstartupget) | **GET** /api/v0/options/startup | Gets the application options provided at startup. |
| [**apiV0OptionsYamlGet**](OptionsApi.md#apiv0optionsyamlget) | **GET** /api/v0/options/yaml | Gets the content of the YAML configuration file. |
| [**apiV0OptionsYamlLocationGet**](OptionsApi.md#apiv0optionsyamllocationget) | **GET** /api/v0/options/yaml/location | Gets the location of the YAML configuration file. |
| [**apiV0OptionsYamlPost**](OptionsApi.md#apiv0optionsyamlpost) | **POST** /api/v0/options/yaml | Updates the YAML configuration file. |
| [**apiV0OptionsYamlValidatePost**](OptionsApi.md#apiv0optionsyamlvalidatepost) | **POST** /api/v0/options/yaml/validate | Validates the provided YAML configuration. |



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

> SlskdOptions apiV0OptionsGet()

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

[**SlskdOptions**](SlskdOptions.md)

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

> SlskdOptions apiV0OptionsStartupGet()

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

[**SlskdOptions**](SlskdOptions.md)

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

> string apiV0OptionsYamlGet()

Gets the content of the YAML configuration file.

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
| **403** | Remote configuration is disabled. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsYamlLocationGet

> string apiV0OptionsYamlLocationGet()

Gets the location of the YAML configuration file.

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
| **403** | Remote configuration is disabled. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsYamlPost

> apiV0OptionsYamlPost(body)

Updates the YAML configuration file.

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
    // string | The new YAML configuration content. (optional)
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
| **body** | `string` | The new YAML configuration content. | [Optional] |

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
| **200** | The request completed successfully. |  -  |
| **400** | The YAML is invalid. |  -  |
| **403** | Remote configuration is disabled. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0OptionsYamlValidatePost

> string apiV0OptionsYamlValidatePost(body)

Validates the provided YAML configuration.

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
    // string | The YAML configuration to validate. (optional)
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
| **body** | `string` | The YAML configuration to validate. | [Optional] |

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The YAML is valid or returns validation error. |  -  |
| **403** | Remote configuration is disabled. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

