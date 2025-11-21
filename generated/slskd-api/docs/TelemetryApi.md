# TelemetryApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0TelemetryMetricsGet**](TelemetryApi.md#apiv0telemetrymetricsget) | **GET** /api/v0/telemetry/metrics | Gets application metrics. |
| [**apiV0TelemetryMetricsKpiGet**](TelemetryApi.md#apiv0telemetrymetricskpiget) | **GET** /api/v0/telemetry/metrics/kpi | Gets gets key performance indicators for the application. |



## apiV0TelemetryMetricsGet

> apiV0TelemetryMetricsGet()

Gets application metrics.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryMetricsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  try {
    const data = await api.apiV0TelemetryMetricsGet();
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


## apiV0TelemetryMetricsKpiGet

> apiV0TelemetryMetricsKpiGet()

Gets gets key performance indicators for the application.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryMetricsKpiGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  try {
    const data = await api.apiV0TelemetryMetricsKpiGet();
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

