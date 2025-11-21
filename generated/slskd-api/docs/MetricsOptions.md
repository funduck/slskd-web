
# MetricsOptions

Metrics options.

## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`url` | string
`authentication` | [MetricsAuthenticationOptions](MetricsAuthenticationOptions.md)

## Example

```typescript
import type { MetricsOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "url": null,
  "authentication": null,
} satisfies MetricsOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MetricsOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


