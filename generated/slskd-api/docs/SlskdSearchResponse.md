
# SlskdSearchResponse


## Properties

Name | Type
------------ | -------------
`file_count` | number
`files` | [Array&lt;SlskdSearchFile&gt;](SlskdSearchFile.md)
`has_free_upload_slot` | boolean
`locked_file_count` | number
`locked_files` | [Array&lt;SlskdSearchFile&gt;](SlskdSearchFile.md)
`queue_length` | number
`token` | number
`upload_speed` | number
`username` | string

## Example

```typescript
import type { SlskdSearchResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "file_count": null,
  "files": null,
  "has_free_upload_slot": null,
  "locked_file_count": null,
  "locked_files": null,
  "queue_length": null,
  "token": null,
  "upload_speed": null,
  "username": null,
} satisfies SlskdSearchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdSearchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


