
# SoulseekBrowseProgressUpdatedEventArgs


## Properties

Name | Type
------------ | -------------
`username` | string
`bytes_transferred` | number
`bytes_remaining` | number
`percent_complete` | number
`size` | number

## Example

```typescript
import type { SoulseekBrowseProgressUpdatedEventArgs } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "bytes_transferred": null,
  "bytes_remaining": null,
  "percent_complete": null,
  "size": null,
} satisfies SoulseekBrowseProgressUpdatedEventArgs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SoulseekBrowseProgressUpdatedEventArgs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


