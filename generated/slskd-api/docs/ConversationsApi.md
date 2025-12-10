# ConversationsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV0ConversationsGet**](ConversationsApi.md#apiv0conversationsget) | **GET** /api/v0/conversations | Gets all active conversations. |
| [**apiV0ConversationsUsernameDelete**](ConversationsApi.md#apiv0conversationsusernamedelete) | **DELETE** /api/v0/conversations/{username} | Closes the conversation associated with the given username. |
| [**apiV0ConversationsUsernameGet**](ConversationsApi.md#apiv0conversationsusernameget) | **GET** /api/v0/conversations/{username} | Gets the conversation associated with the specified username. |
| [**apiV0ConversationsUsernameIdPut**](ConversationsApi.md#apiv0conversationsusernameidput) | **PUT** /api/v0/conversations/{username}/{id} | Acknowledges the given message id for the given username. |
| [**apiV0ConversationsUsernameMessagesGet**](ConversationsApi.md#apiv0conversationsusernamemessagesget) | **GET** /api/v0/conversations/{username}/messages | Gets all messages for the conversation associated with the specified username. |
| [**apiV0ConversationsUsernamePost**](ConversationsApi.md#apiv0conversationsusernamepost) | **POST** /api/v0/conversations/{username} | Sends a private message to the specified username. |
| [**apiV0ConversationsUsernamePut**](ConversationsApi.md#apiv0conversationsusernameput) | **PUT** /api/v0/conversations/{username} | Acknowledges all messages from the given username. |



## apiV0ConversationsGet

> Array&lt;SlskdMessagingConversation&gt; apiV0ConversationsGet(include_inactive, un_acknowledged_only)

Gets all active conversations.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // boolean (optional)
    include_inactive: true,
    // boolean (optional)
    un_acknowledged_only: true,
  } satisfies ApiV0ConversationsGetRequest;

  try {
    const data = await api.apiV0ConversationsGet(body);
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
| **include_inactive** | `boolean` |  | [Optional] [Defaults to `false`] |
| **un_acknowledged_only** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;SlskdMessagingConversation&gt;**](SlskdMessagingConversation.md)

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


## apiV0ConversationsUsernameDelete

> apiV0ConversationsUsernameDelete(username)

Closes the conversation associated with the given username.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsUsernameDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // string
    username: username_example,
  } satisfies ApiV0ConversationsUsernameDeleteRequest;

  try {
    const data = await api.apiV0ConversationsUsernameDelete(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |

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
| **404** | A conversation with the specified username could not be found. |  -  |
| **204** | The request completed successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ConversationsUsernameGet

> SlskdMessagingConversation apiV0ConversationsUsernameGet(username, include_messages)

Gets the conversation associated with the specified username.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsUsernameGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // string | The username associated with the desired conversation.
    username: username_example,
    // boolean |  (optional)
    include_messages: true,
  } satisfies ApiV0ConversationsUsernameGetRequest;

  try {
    const data = await api.apiV0ConversationsUsernameGet(body);
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
| **username** | `string` | The username associated with the desired conversation. | [Defaults to `undefined`] |
| **include_messages** | `boolean` |  | [Optional] [Defaults to `true`] |

### Return type

[**SlskdMessagingConversation**](SlskdMessagingConversation.md)

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


## apiV0ConversationsUsernameIdPut

> apiV0ConversationsUsernameIdPut(username, id)

Acknowledges the given message id for the given username.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsUsernameIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // string | 
    username: username_example,
    // number | 
    id: 56,
  } satisfies ApiV0ConversationsUsernameIdPutRequest;

  try {
    const data = await api.apiV0ConversationsUsernameIdPut(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |
| **id** | `number` |  | [Defaults to `undefined`] |

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
| **200** | The request completed successfully. |  -  |
| **404** | A conversation with the specified username, or a message matching the specified id could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ConversationsUsernameMessagesGet

> Array&lt;SlskdMessagingPrivateMessage&gt; apiV0ConversationsUsernameMessagesGet(username, un_acknowledged_only)

Gets all messages for the conversation associated with the specified username.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsUsernameMessagesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // string | The username associated with the desired conversation.
    username: username_example,
    // boolean | Return only unacknowledged messages. (optional)
    un_acknowledged_only: true,
  } satisfies ApiV0ConversationsUsernameMessagesGetRequest;

  try {
    const data = await api.apiV0ConversationsUsernameMessagesGet(body);
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
| **username** | `string` | The username associated with the desired conversation. | [Defaults to `undefined`] |
| **un_acknowledged_only** | `boolean` | Return only unacknowledged messages. | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;SlskdMessagingPrivateMessage&gt;**](SlskdMessagingPrivateMessage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The request completed successfully. |  -  |
| **404** | A conversation with the specified username could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ConversationsUsernamePost

> apiV0ConversationsUsernamePost(username, body)

Sends a private message to the specified username.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsUsernamePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // string | 
    username: username_example,
    // string |  (optional)
    body: body_example,
  } satisfies ApiV0ConversationsUsernamePostRequest;

  try {
    const data = await api.apiV0ConversationsUsernamePost(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |
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
| **400** | The specified message is null or empty. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV0ConversationsUsernamePut

> apiV0ConversationsUsernamePut(username)

Acknowledges all messages from the given username.

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { ApiV0ConversationsUsernamePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationsApi();

  const body = {
    // string | 
    username: username_example,
  } satisfies ApiV0ConversationsUsernamePutRequest;

  try {
    const data = await api.apiV0ConversationsUsernamePut(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |

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
| **200** | The request completed successfully. |  -  |
| **404** | A conversation with the specified username could not be found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

