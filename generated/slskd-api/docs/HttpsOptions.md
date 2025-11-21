
# HttpsOptions

HTTPS options.

## Properties

Name | Type
------------ | -------------
`disabled` | boolean
`port` | number
`force` | boolean
`certificate` | [CertificateOptions](CertificateOptions.md)

## Example

```typescript
import type { HttpsOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "disabled": null,
  "port": null,
  "force": null,
  "certificate": null,
} satisfies HttpsOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HttpsOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


