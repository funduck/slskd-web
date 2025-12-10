
# SlskdServerConnectionWatchdogState


## Properties

Name | Type
------------ | -------------
`is_enabled` | boolean
`is_attempting_connection` | boolean
`next_attempt_at` | Date

## Example

```typescript
import type { SlskdServerConnectionWatchdogState } from ''

// TODO: Update the object below with actual values
const example = {
  "is_enabled": null,
  "is_attempting_connection": null,
  "next_attempt_at": null,
} satisfies SlskdServerConnectionWatchdogState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdServerConnectionWatchdogState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


