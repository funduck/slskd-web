
# SlskdServerState


## Properties

Name | Type
------------ | -------------
`address` | string
`ip_end_point` | [SystemNetIPEndPoint](SystemNetIPEndPoint.md)
`state` | [SoulseekSoulseekClientStates](SoulseekSoulseekClientStates.md)
`is_connected` | boolean
`is_connecting` | boolean
`is_logged_in` | boolean
`is_logging_in` | boolean
`is_transitioning` | boolean

## Example

```typescript
import type { SlskdServerState } from ''

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "ip_end_point": null,
  "state": null,
  "is_connected": null,
  "is_connecting": null,
  "is_logged_in": null,
  "is_logging_in": null,
  "is_transitioning": null,
} satisfies SlskdServerState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdServerState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


