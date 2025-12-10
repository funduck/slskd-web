
# SlskdOptionsLimitsOptions

Limit options.

## Properties

Name | Type
------------ | -------------
`queued` | [SlskdOptionsLimitsOptionsLimits](SlskdOptionsLimitsOptionsLimits.md)
`daily` | [SlskdOptionsLimitsOptionsLimits](SlskdOptionsLimitsOptionsLimits.md)
`weekly` | [SlskdOptionsLimitsOptionsLimits](SlskdOptionsLimitsOptionsLimits.md)

## Example

```typescript
import type { SlskdOptionsLimitsOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "queued": null,
  "daily": null,
  "weekly": null,
} satisfies SlskdOptionsLimitsOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdOptionsLimitsOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


