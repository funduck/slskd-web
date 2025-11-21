
# ModelFile


## Properties

Name | Type
------------ | -------------
`attribute_count` | number
`attributes` | [Array&lt;FileAttribute&gt;](FileAttribute.md)
`bit_depth` | number
`bit_rate` | number
`code` | number
`extension` | string
`filename` | string
`is_variable_bit_rate` | boolean
`length` | number
`sample_rate` | number
`size` | number

## Example

```typescript
import type { ModelFile } from ''

// TODO: Update the object below with actual values
const example = {
  "attribute_count": null,
  "attributes": null,
  "bit_depth": null,
  "bit_rate": null,
  "code": null,
  "extension": null,
  "filename": null,
  "is_variable_bit_rate": null,
  "length": null,
  "sample_rate": null,
  "size": null,
} satisfies ModelFile

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ModelFile
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


