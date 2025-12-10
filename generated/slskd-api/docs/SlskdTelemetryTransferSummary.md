
# SlskdTelemetryTransferSummary


## Properties

Name | Type
------------ | -------------
`username` | string
`total_bytes` | number
`count` | number
`distinct_users` | number
`average_speed` | number
`average_wait` | number
`average_duration` | number

## Example

```typescript
import type { SlskdTelemetryTransferSummary } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "total_bytes": null,
  "count": null,
  "distinct_users": null,
  "average_speed": null,
  "average_wait": null,
  "average_duration": null,
} satisfies SlskdTelemetryTransferSummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdTelemetryTransferSummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


