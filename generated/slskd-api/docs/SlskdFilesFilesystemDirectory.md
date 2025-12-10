
# SlskdFilesFilesystemDirectory

A file directory on the host filesystem.

## Properties

Name | Type
------------ | -------------
`name` | string
`full_name` | string
`attributes` | [SystemIOFileAttributes](SystemIOFileAttributes.md)
`created_at` | Date
`modified_at` | Date
`files` | [Array&lt;SlskdFilesFilesystemFile&gt;](SlskdFilesFilesystemFile.md)
`directories` | [Array&lt;SlskdFilesFilesystemDirectory&gt;](SlskdFilesFilesystemDirectory.md)

## Example

```typescript
import type { SlskdFilesFilesystemDirectory } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "full_name": null,
  "attributes": null,
  "created_at": null,
  "modified_at": null,
  "files": null,
  "directories": null,
} satisfies SlskdFilesFilesystemDirectory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdFilesFilesystemDirectory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


