
# FilesystemFile

A file on the host filesystem.

## Properties

Name | Type
------------ | -------------
`name` | string
`full_name` | string
`length` | number
`attributes` | [FileAttributes](FileAttributes.md)
`created_at` | Date
`modified_at` | Date

## Example

```typescript
import type { FilesystemFile } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "full_name": null,
  "length": null,
  "attributes": null,
  "created_at": null,
  "modified_at": null,
} satisfies FilesystemFile

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FilesystemFile
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


