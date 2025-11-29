
# SearchResponse

A search response from a single user.

## Properties

Name | Type
------------ | -------------
`username` | string
`token` | number
`file_count` | number
`locked_file_count` | number
`has_free_upload_slot` | boolean
`upload_speed` | number
`queue_length` | number
`files` | [Array&lt;FileModel&gt;](FileModel.md)
`locked_files` | [Array&lt;FileModel&gt;](FileModel.md)

## Example

```typescript
import type { SearchResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "token": null,
  "file_count": null,
  "locked_file_count": null,
  "has_free_upload_slot": null,
  "upload_speed": null,
  "queue_length": null,
  "files": null,
  "locked_files": null,
} satisfies SearchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


