
# Search

A search instance.

## Properties

Name | Type
------------ | -------------
`id` | string
`search_text` | string
`token` | number
`state` | string
`is_complete` | boolean
`started_at` | Date
`ended_at` | Date
`file_count` | number
`locked_file_count` | number
`response_count` | number
`responses` | [Array&lt;SearchResponse&gt;](SearchResponse.md)

## Example

```typescript
import type { Search } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "search_text": null,
  "token": null,
  "state": null,
  "is_complete": null,
  "started_at": null,
  "ended_at": null,
  "file_count": null,
  "locked_file_count": null,
  "response_count": null,
  "responses": null,
} satisfies Search

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Search
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


