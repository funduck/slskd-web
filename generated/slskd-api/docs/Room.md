
# Room


## Properties

Name | Type
------------ | -------------
`name` | string
`is_private` | boolean
`operator_count` | number
`operators` | Array&lt;string&gt;
`owner` | string
`users` | [Array&lt;UserData&gt;](UserData.md)
`messages` | [Array&lt;RoomMessage&gt;](RoomMessage.md)

## Example

```typescript
import type { Room } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "is_private": null,
  "operator_count": null,
  "operators": null,
  "owner": null,
  "users": null,
  "messages": null,
} satisfies Room

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Room
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


