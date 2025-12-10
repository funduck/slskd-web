
# SlskdSearchSearch


## Properties

Name | Type
------------ | -------------
`ended_at` | Date
`file_count` | number
`id` | string
`is_complete` | boolean
`locked_file_count` | number
`response_count` | number
`responses` | [Array&lt;SlskdSearchResponse&gt;](SlskdSearchResponse.md)
`search_text` | string
`started_at` | Date
`state` | [SoulseekSearchStates](SoulseekSearchStates.md)
`token` | number

## Example

```typescript
import type { SlskdSearchSearch } from ''

// TODO: Update the object below with actual values
const example = {
  "ended_at": null,
  "file_count": null,
  "id": null,
  "is_complete": null,
  "locked_file_count": null,
  "response_count": null,
  "responses": null,
  "search_text": null,
  "started_at": null,
  "state": null,
  "token": null,
} satisfies SlskdSearchSearch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdSearchSearch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


