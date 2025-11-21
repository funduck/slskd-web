
# ServerState


## Properties

Name | Type
------------ | -------------
`address` | string
`ip_end_point` | [IPEndPoint](IPEndPoint.md)
`state` | [SoulseekClientStates](SoulseekClientStates.md)
`username` | string
`is_connected` | boolean
`is_logged_in` | boolean
`is_transitioning` | boolean

## Example

```typescript
import type { ServerState } from ''

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "ip_end_point": null,
  "state": null,
  "username": null,
  "is_connected": null,
  "is_logged_in": null,
  "is_transitioning": null,
} satisfies ServerState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


