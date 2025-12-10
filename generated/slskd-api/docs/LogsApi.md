# LogsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0LogsGet**](LogsApi.md#apiv0logsget) | **GET** /api/v0/logs | Gets the last few application logs. |



## apiV0LogsGet

> Array&lt;SlskdLogRecord&gt; apiV0LogsGet()

Gets the last few application logs.

### Example

```ts
import {
  Configuration,
  LogsApi,
} from '';
import type { ApiV0LogsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LogsApi();

  try {
    const data = await api.apiV0LogsGet();
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

[**Array&lt;SlskdLogRecord&gt;**](SlskdLogRecord.md)

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

