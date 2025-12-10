
# SlskdEventsEventRecord


## Properties

Name | Type
------------ | -------------
`timestamp` | Date
`type` | [SlskdEventsEventType](SlskdEventsEventType.md)
`data` | string
`id` | string

## Example

```typescript
import type { SlskdEventsEventRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "type": null,
  "data": null,
  "id": null,
} satisfies SlskdEventsEventRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdEventsEventRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


