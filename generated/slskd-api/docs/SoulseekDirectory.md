
# SoulseekDirectory


## Properties

Name | Type
------------ | -------------
`name` | string
`file_count` | number
`files` | [Array&lt;SoulseekFile&gt;](SoulseekFile.md)

## Example

```typescript
import type { SoulseekDirectory } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "file_count": null,
  "files": null,
} satisfies SoulseekDirectory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SoulseekDirectory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


