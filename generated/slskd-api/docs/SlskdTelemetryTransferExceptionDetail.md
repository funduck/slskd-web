
# SlskdTelemetryTransferExceptionDetail


## Properties

Name | Type
------------ | -------------
`id` | string
`username` | string
`direction` | [SoulseekTransferDirection](SoulseekTransferDirection.md)
`filename` | string
`size` | number
`start_offset` | number
`state` | [SoulseekTransferStates](SoulseekTransferStates.md)
`requested_at` | Date
`enqueued_at` | Date
`started_at` | Date
`ended_at` | Date
`bytes_transferred` | number
`average_speed` | number
`exception` | string

## Example

```typescript
import type { SlskdTelemetryTransferExceptionDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "username": null,
  "direction": null,
  "filename": null,
  "size": null,
  "start_offset": null,
  "state": null,
  "requested_at": null,
  "enqueued_at": null,
  "started_at": null,
  "ended_at": null,
  "bytes_transferred": null,
  "average_speed": null,
  "exception": null,
} satisfies SlskdTelemetryTransferExceptionDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdTelemetryTransferExceptionDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


