
# SlskdOptionsWebOptionsHttpsOptions

HTTPS options.

## Properties

Name | Type
------------ | -------------
`disabled` | boolean
`port` | number
`force` | boolean
`certificate` | [SlskdOptionsWebOptionsHttpsOptionsCertificateOptions](SlskdOptionsWebOptionsHttpsOptionsCertificateOptions.md)

## Example

```typescript
import type { SlskdOptionsWebOptionsHttpsOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "disabled": null,
  "port": null,
  "force": null,
  "certificate": null,
} satisfies SlskdOptionsWebOptionsHttpsOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdOptionsWebOptionsHttpsOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


