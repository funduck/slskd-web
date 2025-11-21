
# RetentionOptions

Retention options.

## Properties

Name | Type
------------ | -------------
`search` | number
`transfers` | [TransferRetentionOptions](TransferRetentionOptions.md)
`files` | [FileRetentionOptions](FileRetentionOptions.md)
`logs` | number

## Example

```typescript
import type { RetentionOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "search": null,
  "transfers": null,
  "files": null,
  "logs": null,
} satisfies RetentionOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RetentionOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


