
# GlobalOptions

Global options.

## Properties

Name | Type
------------ | -------------
`upload` | [GlobalUploadOptions](GlobalUploadOptions.md)
`limits` | [LimitsOptions](LimitsOptions.md)
`download` | [GlobalDownloadOptions](GlobalDownloadOptions.md)

## Example

```typescript
import type { GlobalOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "upload": null,
  "limits": null,
  "download": null,
} satisfies GlobalOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GlobalOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


