
# SlskdLogRecord


## Properties

Name | Type
------------ | -------------
`timestamp` | Date
`context` | string
`sub_context` | string
`level` | string
`message` | string

## Example

```typescript
import type { SlskdLogRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "context": null,
  "sub_context": null,
  "level": null,
  "message": null,
} satisfies SlskdLogRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdLogRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


