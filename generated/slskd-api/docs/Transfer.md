
# Transfer

A single file transfer.

## Properties

Name | Type
------------ | -------------
`average_speed` | number
`bytes_remaining` | number
`bytes_transferred` | number
`direction` | [TransferDirection](TransferDirection.md)
`elapsed_time` | number
`end_time` | Date
`filename` | string
`id` | string
`ip_end_point` | [IPEndPoint](IPEndPoint.md)
`percent_complete` | number
`place_in_queue` | number
`remaining_time` | number
`remote_token` | number
`size` | number
`start_offset` | number
`start_time` | Date
`state` | [TransferStates](TransferStates.md)
`token` | number
`username` | string
`exception` | string

## Example

```typescript
import type { Transfer } from ''

// TODO: Update the object below with actual values
const example = {
  "average_speed": null,
  "bytes_remaining": null,
  "bytes_transferred": null,
  "direction": null,
  "elapsed_time": null,
  "end_time": null,
  "filename": null,
  "id": null,
  "ip_end_point": null,
  "percent_complete": null,
  "place_in_queue": null,
  "remaining_time": null,
  "remote_token": null,
  "size": null,
  "start_offset": null,
  "start_time": null,
  "state": null,
  "token": null,
  "username": null,
  "exception": null,
} satisfies Transfer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Transfer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


