
# UsersBrowseResponse


## Properties

Name | Type
------------ | -------------
`directories` | [Array&lt;Directory&gt;](Directory.md)
`directory_count` | number
`locked_directories` | [Array&lt;Directory&gt;](Directory.md)
`locked_directory_count` | number

## Example

```typescript
import type { UsersBrowseResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "directories": null,
  "directory_count": null,
  "locked_directories": null,
  "locked_directory_count": null,
} satisfies UsersBrowseResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UsersBrowseResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


