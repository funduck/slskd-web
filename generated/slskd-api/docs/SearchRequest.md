
# SearchRequest

A search request.

## Properties

Name | Type
------------ | -------------
`id` | string
`file_limit` | number
`filter_responses` | boolean
`maximum_peer_queue_length` | number
`minimum_peer_upload_speed` | number
`minimum_response_file_count` | number
`response_limit` | number
`search_text` | string
`search_timeout` | number
`token` | number

## Example

```typescript
import type { SearchRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "file_limit": null,
  "filter_responses": null,
  "maximum_peer_queue_length": null,
  "minimum_peer_upload_speed": null,
  "minimum_response_file_count": null,
  "response_limit": null,
  "search_text": null,
  "search_timeout": null,
  "token": null,
} satisfies SearchRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


