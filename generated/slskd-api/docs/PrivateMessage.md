
# PrivateMessage

A private message.

## Properties

Name | Type
------------ | -------------
`timestamp` | Date
`id` | number
`username` | string
`direction` | [MessageDirection](MessageDirection.md)
`message` | string
`is_acknowledged` | boolean
`was_replayed` | boolean

## Example

```typescript
import type { PrivateMessage } from ''

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "id": null,
  "username": null,
  "direction": null,
  "message": null,
  "is_acknowledged": null,
  "was_replayed": null,
} satisfies PrivateMessage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PrivateMessage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


