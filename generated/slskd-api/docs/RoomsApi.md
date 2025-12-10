# RoomsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0RoomsAvailableGet**](RoomsApi.md#apiv0roomsavailableget) | **GET** /api/v0/rooms/available | Gets a list of rooms from the server. |
| [**apiV0RoomsJoinedGet**](RoomsApi.md#apiv0roomsjoinedget) | **GET** /api/v0/rooms/joined | Gets all rooms. |
| [**apiV0RoomsJoinedPost**](RoomsApi.md#apiv0roomsjoinedpost) | **POST** /api/v0/rooms/joined | Joins a room. |
| [**apiV0RoomsJoinedRoomNameDelete**](RoomsApi.md#apiv0roomsjoinedroomnamedelete) | **DELETE** /api/v0/rooms/joined/{roomName} | Leaves a room. |
| [**apiV0RoomsJoinedRoomNameGet**](RoomsApi.md#apiv0roomsjoinedroomnameget) | **GET** /api/v0/rooms/joined/{roomName} | Gets the specified room. |
| [**apiV0RoomsJoinedRoomNameMembersPost**](RoomsApi.md#apiv0roomsjoinedroomnamememberspost) | **POST** /api/v0/rooms/joined/{roomName}/members | Adds a member to a private room. |
| [**apiV0RoomsJoinedRoomNameMessagesGet**](RoomsApi.md#apiv0roomsjoinedroomnamemessagesget) | **GET** /api/v0/rooms/joined/{roomName}/messages | Gets the current list of messages for the specified room. |
| [**apiV0RoomsJoinedRoomNameMessagesPost**](RoomsApi.md#apiv0roomsjoinedroomnamemessagespost) | **POST** /api/v0/rooms/joined/{roomName}/messages | Sends a message to the specified room. |
| [**apiV0RoomsJoinedRoomNameTickerPost**](RoomsApi.md#apiv0roomsjoinedroomnametickerpost) | **POST** /api/v0/rooms/joined/{roomName}/ticker | Sets a ticker for the specified room. |
| [**apiV0RoomsJoinedRoomNameUsersGet**](RoomsApi.md#apiv0roomsjoinedroomnameusersget) | **GET** /api/v0/rooms/joined/{roomName}/users | Gets the current list of users for the specified room. |



## apiV0RoomsAvailableGet

> Array&lt;SoulseekRoomInfo&gt; apiV0RoomsAvailableGet()

Gets a list of rooms from the server.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsAvailableGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  try {
    const data = await api.apiV0RoomsAvailableGet();
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

[**Array&lt;SoulseekRoomInfo&gt;**](SoulseekRoomInfo.md)

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


## apiV0RoomsJoinedGet

> { [key: string]: { [key: string]: SlskdMessagingRoom; }; } apiV0RoomsJoinedGet()

Gets all rooms.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  try {
    const data = await api.apiV0RoomsJoinedGet();
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

**{ [key: string]: { [key: string]: SlskdMessagingRoom; }; }**

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


## apiV0RoomsJoinedPost

> SlskdMessagingRoom apiV0RoomsJoinedPost(body)

Joins a room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string |  (optional)
    body: body_example,
  } satisfies ApiV0RoomsJoinedPostRequest;

  try {
    const data = await api.apiV0RoomsJoinedPost(body);
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

[**SlskdMessagingRoom**](SlskdMessagingRoom.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | The request completed successfully. |  -  |
| **304** | The room has already been joined. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameDelete

> apiV0RoomsJoinedRoomNameDelete(room_name)

Leaves a room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
  } satisfies ApiV0RoomsJoinedRoomNameDeleteRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameDelete(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |

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
| **404** | The room has not been joined. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameGet

> SlskdMessagingRoom apiV0RoomsJoinedRoomNameGet(room_name)

Gets the specified room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
  } satisfies ApiV0RoomsJoinedRoomNameGetRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameGet(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SlskdMessagingRoom**](SlskdMessagingRoom.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified roomName could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameMembersPost

> apiV0RoomsJoinedRoomNameMembersPost(room_name, body)

Adds a member to a private room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameMembersPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
    // string |  (optional)
    body: body_example,
  } satisfies ApiV0RoomsJoinedRoomNameMembersPostRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameMembersPost(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |
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
| **201** | The request completed successfully. |  -  |
| **404** | The specified roomName could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameMessagesGet

> Array&lt;SlskdMessagingRoomMessage&gt; apiV0RoomsJoinedRoomNameMessagesGet(room_name)

Gets the current list of messages for the specified room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameMessagesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
  } satisfies ApiV0RoomsJoinedRoomNameMessagesGetRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameMessagesGet(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;SlskdMessagingRoomMessage&gt;**](SlskdMessagingRoomMessage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified roomName could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameMessagesPost

> apiV0RoomsJoinedRoomNameMessagesPost(room_name, body)

Sends a message to the specified room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameMessagesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
    // string |  (optional)
    body: body_example,
  } satisfies ApiV0RoomsJoinedRoomNameMessagesPostRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameMessagesPost(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |
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
| **201** | The request completed successfully. |  -  |
| **404** | The specified roomName could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameTickerPost

> apiV0RoomsJoinedRoomNameTickerPost(room_name, body)

Sets a ticker for the specified room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameTickerPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
    // string |  (optional)
    body: body_example,
  } satisfies ApiV0RoomsJoinedRoomNameTickerPostRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameTickerPost(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |
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
| **201** | The request completed successfully. |  -  |
| **404** | The specified roomName could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0RoomsJoinedRoomNameUsersGet

> Array&lt;SoulseekUserData&gt; apiV0RoomsJoinedRoomNameUsersGet(room_name)

Gets the current list of users for the specified room.

### Example

```ts
import {
  Configuration,
  RoomsApi,
} from '';
import type { ApiV0RoomsJoinedRoomNameUsersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoomsApi();

  const body = {
    // string | 
    room_name: room_name_example,
  } satisfies ApiV0RoomsJoinedRoomNameUsersGetRequest;

  try {
    const data = await api.apiV0RoomsJoinedRoomNameUsersGet(body);
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
| **room_name** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;SoulseekUserData&gt;**](SoulseekUserData.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | The specified roomName could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

