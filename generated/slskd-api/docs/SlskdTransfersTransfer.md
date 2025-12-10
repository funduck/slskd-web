
# SlskdTransfersTransfer


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
`state_description` | string
`requested_at` | Date
`enqueued_at` | Date
`started_at` | Date
`ended_at` | Date
`bytes_transferred` | number
`average_speed` | number
`place_in_queue` | number
`exception` | string
`bytes_remaining` | number
`elapsed_time` | string
`percent_complete` | number
`remaining_time` | string

## Example

```typescript
import type { SlskdTransfersTransfer } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "username": null,
  "direction": null,
  "filename": null,
  "size": null,
  "start_offset": null,
  "state": null,
  "state_description": null,
  "requested_at": null,
  "enqueued_at": null,
  "started_at": null,
  "ended_at": null,
  "bytes_transferred": null,
  "average_speed": null,
  "place_in_queue": null,
  "exception": null,
  "bytes_remaining": null,
  "elapsed_time": null,
  "percent_complete": null,
  "remaining_time": null,
} satisfies SlskdTransfersTransfer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdTransfersTransfer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


