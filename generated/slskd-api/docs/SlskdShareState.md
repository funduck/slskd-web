
# SlskdShareState

Share state.

## Properties

Name | Type
------------ | -------------
`scan_pending` | boolean
`scanning` | boolean
`ready` | boolean
`faulted` | boolean
`cancelled` | boolean
`scan_progress` | number
`hosts` | Array&lt;string&gt;
`directories` | number
`files` | number

## Example

```typescript
import type { SlskdShareState } from ''

// TODO: Update the object below with actual values
const example = {
  "scan_pending": null,
  "scanning": null,
  "ready": null,
  "faulted": null,
  "cancelled": null,
  "scan_progress": null,
  "hosts": null,
  "directories": null,
  "files": null,
} satisfies SlskdShareState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdShareState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


