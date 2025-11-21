
# RoomMessage

A message sent to a room.

## Properties

Name | Type
------------ | -------------
`timestamp` | Date
`username` | string
`message` | string
`room_name` | string
`direction` | [MessageDirection](MessageDirection.md)

## Example

```typescript
import type { RoomMessage } from ''

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "username": null,
  "message": null,
  "room_name": null,
  "direction": null,
} satisfies RoomMessage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoomMessage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


