
# Info


## Properties

Name | Type
------------ | -------------
`description` | string
`has_free_upload_slot` | boolean
`has_picture` | boolean
`picture` | string
`queue_length` | number
`upload_slots` | number

## Example

```typescript
import type { Info } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "has_free_upload_slot": null,
  "has_picture": null,
  "picture": null,
  "queue_length": null,
  "upload_slots": null,
} satisfies Info

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Info
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


