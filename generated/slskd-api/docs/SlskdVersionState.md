
# SlskdVersionState


## Properties

Name | Type
------------ | -------------
`full` | string
`current` | string
`latest` | string
`is_update_available` | boolean
`is_canary` | boolean
`is_development` | boolean

## Example

```typescript
import type { SlskdVersionState } from ''

// TODO: Update the object below with actual values
const example = {
  "full": null,
  "current": null,
  "latest": null,
  "is_update_available": null,
  "is_canary": null,
  "is_development": null,
} satisfies SlskdVersionState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdVersionState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


