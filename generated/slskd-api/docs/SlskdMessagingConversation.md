
# SlskdMessagingConversation


## Properties

Name | Type
------------ | -------------
`username` | string
`is_active` | boolean
`un_acknowledged_message_count` | number
`has_un_acknowledged_messages` | boolean
`messages` | [Array&lt;SlskdMessagingPrivateMessage&gt;](SlskdMessagingPrivateMessage.md)

## Example

```typescript
import type { SlskdMessagingConversation } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "is_active": null,
  "un_acknowledged_message_count": null,
  "has_un_acknowledged_messages": null,
  "messages": null,
} satisfies SlskdMessagingConversation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdMessagingConversation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


