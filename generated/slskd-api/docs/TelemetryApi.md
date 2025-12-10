# TelemetryApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0TelemetryMetricsGet**](TelemetryApi.md#apiv0telemetrymetricsget) | **GET** /api/v0/telemetry/metrics | Gets all application metrics. |
| [**apiV0TelemetryMetricsKpisGet**](TelemetryApi.md#apiv0telemetrymetricskpisget) | **GET** /api/v0/telemetry/metrics/kpis | Gets gets key performance indicators (KPIs) for the application. |
| [**apiV0TelemetryReportsTransfersDirectoriesGet**](TelemetryApi.md#apiv0telemetryreportstransfersdirectoriesget) | **GET** /api/v0/telemetry/reports/transfers/directories | Gets the top N most frequently downloaded directories by total count and distinct users. |
| [**apiV0TelemetryReportsTransfersExceptionsGet**](TelemetryApi.md#apiv0telemetryreportstransfersexceptionsget) | **GET** /api/v0/telemetry/reports/transfers/exceptions | Gets a list of transfer exceptions by direction. |
| [**apiV0TelemetryReportsTransfersExceptionsParetoGet**](TelemetryApi.md#apiv0telemetryreportstransfersexceptionsparetoget) | **GET** /api/v0/telemetry/reports/transfers/exceptions/pareto | Gets the top N exceptions by total count and direction. |
| [**apiV0TelemetryReportsTransfersHistogramGet**](TelemetryApi.md#apiv0telemetryreportstransfershistogramget) | **GET** /api/v0/telemetry/reports/transfers/histogram | Gets a histogram of all transfer activity over the specified timeframe, aggregated into fixed size time intervals  and grouped by direction and final state. |
| [**apiV0TelemetryReportsTransfersLeaderboardGet**](TelemetryApi.md#apiv0telemetryreportstransfersleaderboardget) | **GET** /api/v0/telemetry/reports/transfers/leaderboard | Gets the top N user summaries by count, total bytes, or average speed. |
| [**apiV0TelemetryReportsTransfersSummaryGet**](TelemetryApi.md#apiv0telemetryreportstransferssummaryget) | **GET** /api/v0/telemetry/reports/transfers/summary | Gets a summary of all transfer activity over the specified timeframe, grouped by direction and final state. |
| [**apiV0TelemetryReportsTransfersUsersUsernameGet**](TelemetryApi.md#apiv0telemetryreportstransfersusersusernameget) | **GET** /api/v0/telemetry/reports/transfers/users/{username} | Gets detailed transfer activity for the specified user. |



## apiV0TelemetryMetricsGet

> string apiV0TelemetryMetricsGet()

Gets all application metrics.

If the \&#39;Accept\&#39; header is set to \&#39;text/plain\&#39;, the response is in Prometheus format. Otherwise if \&#39;application/json\&#39; is set,  the metrics are formatted into a dictionary.

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

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryMetricsKpisGet

> { [key: string]: SlskdTelemetryPrometheusMetric; } apiV0TelemetryMetricsKpisGet()

Gets gets key performance indicators (KPIs) for the application.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryMetricsKpisGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  try {
    const data = await api.apiV0TelemetryMetricsKpisGet();
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

[**{ [key: string]: SlskdTelemetryPrometheusMetric; }**](SlskdTelemetryPrometheusMetric.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersDirectoriesGet

> Array&lt;TransferDirectorySummary&gt; apiV0TelemetryReportsTransfersDirectoriesGet(start, end, username, limit, offset)

Gets the top N most frequently downloaded directories by total count and distinct users.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersDirectoriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // Date | The start time of the window (default: 12/30/2025). (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time of the window (default: now). (optional)
    end: 2013-10-20T19:20:30+01:00,
    // string | An optional username by which to filter records. (optional)
    username: username_example,
    // number | The number of records to return (Default: 25). (optional)
    limit: 56,
    // number | The record offset (if paginating). (optional)
    offset: 56,
  } satisfies ApiV0TelemetryReportsTransfersDirectoriesGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersDirectoriesGet(body);
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
| **start** | `Date` | The start time of the window (default: 12/30/2025). | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time of the window (default: now). | [Optional] [Defaults to `undefined`] |
| **username** | `string` | An optional username by which to filter records. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | The number of records to return (Default: 25). | [Optional] [Defaults to `25`] |
| **offset** | `number` | The record offset (if paginating). | [Optional] [Defaults to `0`] |

### Return type

[**Array&lt;TransferDirectorySummary&gt;**](TransferDirectorySummary.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersExceptionsGet

> Array&lt;SlskdTelemetryTransferExceptionDetail&gt; apiV0TelemetryReportsTransfersExceptionsGet(direction, start, end, username, sort_order, limit, offset)

Gets a list of transfer exceptions by direction.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersExceptionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // string | The direction. (optional)
    direction: direction_example,
    // Date | The start time. (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time. (optional)
    end: 2013-10-20T19:20:30+01:00,
    // string | An optional username by which to filter exceptions. (optional)
    username: username_example,
    // string | The sort order (ASC, DESC. Default: DESC). (optional)
    sort_order: sort_order_example,
    // number | The number of records to return (Default: 25). (optional)
    limit: 56,
    // number | The record offset (if paginating). (optional)
    offset: 56,
  } satisfies ApiV0TelemetryReportsTransfersExceptionsGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersExceptionsGet(body);
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
| **direction** | `string` | The direction. | [Optional] [Defaults to `undefined`] |
| **start** | `Date` | The start time. | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time. | [Optional] [Defaults to `undefined`] |
| **username** | `string` | An optional username by which to filter exceptions. | [Optional] [Defaults to `undefined`] |
| **sort_order** | `string` | The sort order (ASC, DESC. Default: DESC). | [Optional] [Defaults to `&#39;DESC&#39;`] |
| **limit** | `number` | The number of records to return (Default: 25). | [Optional] [Defaults to `25`] |
| **offset** | `number` | The record offset (if paginating). | [Optional] [Defaults to `0`] |

### Return type

[**Array&lt;SlskdTelemetryTransferExceptionDetail&gt;**](SlskdTelemetryTransferExceptionDetail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersExceptionsParetoGet

> Array&lt;SlskdTelemetryTransferExceptionSummary&gt; apiV0TelemetryReportsTransfersExceptionsParetoGet(direction, start, end, username, limit, offset)

Gets the top N exceptions by total count and direction.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersExceptionsParetoGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // string | The direction. (optional)
    direction: direction_example,
    // Date | The start time. (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time. (optional)
    end: 2013-10-20T19:20:30+01:00,
    // string | An optional username by which to filter exceptions. (optional)
    username: username_example,
    // number | The number of records to return (Default: 25). (optional)
    limit: 56,
    // number | The record offset (if paginating). (optional)
    offset: 56,
  } satisfies ApiV0TelemetryReportsTransfersExceptionsParetoGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersExceptionsParetoGet(body);
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
| **direction** | `string` | The direction. | [Optional] [Defaults to `undefined`] |
| **start** | `Date` | The start time. | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time. | [Optional] [Defaults to `undefined`] |
| **username** | `string` | An optional username by which to filter exceptions. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | The number of records to return (Default: 25). | [Optional] [Defaults to `25`] |
| **offset** | `number` | The record offset (if paginating). | [Optional] [Defaults to `0`] |

### Return type

[**Array&lt;SlskdTelemetryTransferExceptionSummary&gt;**](SlskdTelemetryTransferExceptionSummary.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersHistogramGet

> { [key: string]: ApiV0TelemetryReportsTransfersSummaryGet200Response; } apiV0TelemetryReportsTransfersHistogramGet(start, end, interval, direction, username)

Gets a histogram of all transfer activity over the specified timeframe, aggregated into fixed size time intervals  and grouped by direction and final state.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersHistogramGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // Date | The start time of the window (default: 7 days ago). (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time of the window (default: now). (optional)
    end: 2013-10-20T19:20:30+01:00,
    // number | The interval, in minutes (default: 60). (optional)
    interval: 56,
    // string | An optional direction (Upload, Download) by which to filter records. (optional)
    direction: direction_example,
    // string | An optional username by which to filter records. (optional)
    username: username_example,
  } satisfies ApiV0TelemetryReportsTransfersHistogramGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersHistogramGet(body);
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
| **start** | `Date` | The start time of the window (default: 7 days ago). | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time of the window (default: now). | [Optional] [Defaults to `undefined`] |
| **interval** | `number` | The interval, in minutes (default: 60). | [Optional] [Defaults to `60`] |
| **direction** | `string` | An optional direction (Upload, Download) by which to filter records. | [Optional] [Defaults to `undefined`] |
| **username** | `string` | An optional username by which to filter records. | [Optional] [Defaults to `undefined`] |

### Return type

[**{ [key: string]: ApiV0TelemetryReportsTransfersSummaryGet200Response; }**](ApiV0TelemetryReportsTransfersSummaryGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersLeaderboardGet

> Array&lt;SlskdTelemetryTransferSummary&gt; apiV0TelemetryReportsTransfersLeaderboardGet(direction, start, end, sort_by, sort_order, limit, offset)

Gets the top N user summaries by count, total bytes, or average speed.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersLeaderboardGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // string | The direction (Upload, Download). (optional)
    direction: direction_example,
    // Date | The start time of the window (default: 12/30/2025). (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time of the window (default: now). (optional)
    end: 2013-10-20T19:20:30+01:00,
    // string | The property by which to sort (Count, TotalBytes, AverageSpeed. Default: Count). (optional)
    sort_by: sort_by_example,
    // string | The sort order (ASC, DESC. Default: DESC). (optional)
    sort_order: sort_order_example,
    // number | The number of records to return (Default: 25). (optional)
    limit: 56,
    // number | The record offset (if paginating). (optional)
    offset: 56,
  } satisfies ApiV0TelemetryReportsTransfersLeaderboardGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersLeaderboardGet(body);
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
| **direction** | `string` | The direction (Upload, Download). | [Optional] [Defaults to `undefined`] |
| **start** | `Date` | The start time of the window (default: 12/30/2025). | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time of the window (default: now). | [Optional] [Defaults to `undefined`] |
| **sort_by** | `string` | The property by which to sort (Count, TotalBytes, AverageSpeed. Default: Count). | [Optional] [Defaults to `&#39;Count&#39;`] |
| **sort_order** | `string` | The sort order (ASC, DESC. Default: DESC). | [Optional] [Defaults to `&#39;DESC&#39;`] |
| **limit** | `number` | The number of records to return (Default: 25). | [Optional] [Defaults to `25`] |
| **offset** | `number` | The record offset (if paginating). | [Optional] [Defaults to `0`] |

### Return type

[**Array&lt;SlskdTelemetryTransferSummary&gt;**](SlskdTelemetryTransferSummary.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersSummaryGet

> ApiV0TelemetryReportsTransfersSummaryGet200Response apiV0TelemetryReportsTransfersSummaryGet(start, end, direction, username)

Gets a summary of all transfer activity over the specified timeframe, grouped by direction and final state.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersSummaryGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // Date | The start time of the window (default: 7 days ago). (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time of the window (default: now). (optional)
    end: 2013-10-20T19:20:30+01:00,
    // string | An optional direction (Upload, Download) by which to filter records. (optional)
    direction: direction_example,
    // string | An optional username by which to filter records. (optional)
    username: username_example,
  } satisfies ApiV0TelemetryReportsTransfersSummaryGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersSummaryGet(body);
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
| **start** | `Date` | The start time of the window (default: 7 days ago). | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time of the window (default: now). | [Optional] [Defaults to `undefined`] |
| **direction** | `string` | An optional direction (Upload, Download) by which to filter records. | [Optional] [Defaults to `undefined`] |
| **username** | `string` | An optional username by which to filter records. | [Optional] [Defaults to `undefined`] |

### Return type

[**ApiV0TelemetryReportsTransfersSummaryGet200Response**](ApiV0TelemetryReportsTransfersSummaryGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0TelemetryReportsTransfersUsersUsernameGet

> ApiV0TelemetryReportsTransfersUsersUsernameGet200Response apiV0TelemetryReportsTransfersUsersUsernameGet(username, start, end)

Gets detailed transfer activity for the specified user.

### Example

```ts
import {
  Configuration,
  TelemetryApi,
} from '';
import type { ApiV0TelemetryReportsTransfersUsersUsernameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TelemetryApi();

  const body = {
    // string | The username of the user.
    username: username_example,
    // Date | The start time of the summary window (default: 7 days ago). (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date | The end time of the summary window (default: now). (optional)
    end: 2013-10-20T19:20:30+01:00,
  } satisfies ApiV0TelemetryReportsTransfersUsersUsernameGetRequest;

  try {
    const data = await api.apiV0TelemetryReportsTransfersUsersUsernameGet(body);
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
| **start** | `Date` | The start time of the summary window (default: 7 days ago). | [Optional] [Defaults to `undefined`] |
| **end** | `Date` | The end time of the summary window (default: now). | [Optional] [Defaults to `undefined`] |

### Return type

[**ApiV0TelemetryReportsTransfersUsersUsernameGet200Response**](ApiV0TelemetryReportsTransfersUsersUsernameGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **400** | Bad request. |  -  |
| **500** | An error occurred. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

