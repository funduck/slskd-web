# EventsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getEvents**](EventsApi.md#getevents) | **GET** /api/v0/events | Retrieves a paginated list of past event records. |
| [**raiseEvent**](EventsApi.md#raiseevent) | **POST** /api/v0/events/{type} | Raises a sample event of the specified type. |



## getEvents

> Array&lt;EventRecord&gt; getEvents(offset, limit)

Retrieves a paginated list of past event records.

### Example

```ts
import {
  Configuration,
  EventsApi,
} from '';
import type { GetEventsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EventsApi();

  const body = {
    // number | The offset (number of records) at which to start the requested page. (optional)
    offset: 56,
    // number | The page size. (optional)
    limit: 56,
  } satisfies GetEventsRequest;

  try {
    const data = await api.getEvents(body);
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
| **offset** | `number` | The offset (number of records) at which to start the requested page. | [Optional] [Defaults to `0`] |
| **limit** | `number` | The page size. | [Optional] [Defaults to `100`] |

### Return type

[**Array&lt;EventRecord&gt;**](EventRecord.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **400** | The offset is less than zero, or if the limit is less than or equal to zero. |  -  |
| **401** | Authentication credentials are omitted. |  -  |
| **403** | Authentication is valid but not sufficient to access this endpoint. |  -  |
| **500** | An unexpected error is encountered. |  -  |
| **200** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## raiseEvent

> Event raiseEvent(type, body)

Raises a sample event of the specified type.

### Example

```ts
import {
  Configuration,
  EventsApi,
} from '';
import type { RaiseEventRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EventsApi();

  const body = {
    // string | The type of event to raise.
    type: type_example,
    // string | An optional string used to disambiguate generated events. (optional)
    body: body_example,
  } satisfies RaiseEventRequest;

  try {
    const data = await api.raiseEvent(body);
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
| **type** | `string` | The type of event to raise. | [Defaults to `undefined`] |
| **body** | `string` | An optional string used to disambiguate generated events. | [Optional] |

### Return type

[**Event**](Event.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **400** | The specified type is not a valid event type. |  -  |
| **401** | Authentication credentials are omitted. |  -  |
| **403** | Authentication is valid but not sufficient to access this endpoint. |  -  |
| **500** | An unexpected error is encountered. |  -  |
| **201** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

